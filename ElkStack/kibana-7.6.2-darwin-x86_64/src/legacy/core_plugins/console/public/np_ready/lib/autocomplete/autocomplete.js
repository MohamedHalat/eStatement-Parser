"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentMethodAndTokenPaths = getCurrentMethodAndTokenPaths;
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _brace = _interopRequireDefault(require("brace"));

var _i18n = require("@kbn/i18n");

var _kb = require("../kb/kb");

var utils = _interopRequireWildcard(require("../utils/utils"));

var _engine = require("./engine");

var _index = require("./components/index");

var _factories = require("../../application/factories");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var LAST_EVALUATED_TOKEN = null;

function isUrlParamsToken(token) {
  switch ((token || {}).type) {
    case 'url.param':
    case 'url.equal':
    case 'url.value':
    case 'url.questionmark':
    case 'url.amp':
      return true;

    default:
      return false;
  }
}
/**
 * Get the method and token paths for a specific position in the current editor buffer.
 *
 * This function can be used for getting autocomplete information or for getting more information
 * about the endpoint associated with autocomplete. In future, these concerns should be better
 * separated.
 *
 */


function getCurrentMethodAndTokenPaths(editor, pos, parser, forceEndOfUrl)
/* Flag for indicating whether we want to avoid early escape optimization. */
{
  var tokenIter = (0, _factories.createTokenIterator)({
    editor: editor,
    position: pos
  });
  var startPos = pos;
  var bodyTokenPath = [];
  var ret = {};
  var STATES = {
    looking_for_key: 0,
    // looking for a key but without jumping over anything but white space and colon.
    looking_for_scope_start: 1,
    // skip everything until scope start
    start: 3
  };
  var state = STATES.start; // initialization problems -

  var t = tokenIter.getCurrentToken();

  if (t) {
    if (startPos.column === 1) {
      // if we are at the beginning of the line, the current token is the one after cursor, not before which
      // deviates from the standard.
      t = tokenIter.stepBackward();
      state = STATES.looking_for_scope_start;
    }
  } else {
    if (startPos.column === 1) {
      // empty lines do no have tokens, move one back
      t = tokenIter.stepBackward();
      state = STATES.start;
    }
  }

  var walkedSomeBody = false; // climb one scope at a time and get the scope key

  for (; t && t.type.indexOf('url') === -1 && t.type !== 'method'; t = tokenIter.stepBackward()) {
    if (t.type !== 'whitespace') {
      walkedSomeBody = true;
    } // marks we saw something


    switch (t.type) {
      case 'variable':
        if (state === STATES.looking_for_key) {
          bodyTokenPath.unshift(t.value.trim().replace(/"/g, ''));
        }

        state = STATES.looking_for_scope_start; // skip everything until the beginning of this scope

        break;

      case 'paren.lparen':
        bodyTokenPath.unshift(t.value);

        if (state === STATES.looking_for_scope_start) {
          // found it. go look for the relevant key
          state = STATES.looking_for_key;
        }

        break;

      case 'paren.rparen':
        // reset he search for key
        state = STATES.looking_for_scope_start; // and ignore this sub scope..

        var parenCount = 1;
        t = tokenIter.stepBackward();

        while (t && parenCount > 0) {
          switch (t.type) {
            case 'paren.lparen':
              parenCount--;
              break;

            case 'paren.rparen':
              parenCount++;
              break;
          }

          if (parenCount > 0) {
            t = tokenIter.stepBackward();
          }
        }

        if (!t) {
          // oops we run out.. we don't know what's up return null;
          return {};
        }

        continue;

      case 'punctuation.end_triple_quote':
        // reset the search for key
        state = STATES.looking_for_scope_start;

        for (t = tokenIter.stepBackward(); t; t = tokenIter.stepBackward()) {
          if (t.type === 'punctuation.start_triple_quote') {
            t = tokenIter.stepBackward();
            break;
          }
        }

        if (!t) {
          // oops we run out.. we don't know what's up return null;
          return {};
        }

        continue;

      case 'punctuation.start_triple_quote':
        if (state === STATES.start) {
          state = STATES.looking_for_key;
        } else if (state === STATES.looking_for_key) {
          state = STATES.looking_for_scope_start;
        }

        bodyTokenPath.unshift('"""');
        continue;

      case 'string':
      case 'constant.numeric':
      case 'constant.language.boolean':
      case 'text':
        if (state === STATES.start) {
          state = STATES.looking_for_key;
        } else if (state === STATES.looking_for_key) {
          state = STATES.looking_for_scope_start;
        }

        break;

      case 'punctuation.comma':
        if (state === STATES.start) {
          state = STATES.looking_for_scope_start;
        }

        break;

      case 'punctuation.colon':
      case 'whitespace':
        if (state === STATES.start) {
          state = STATES.looking_for_key;
        }

        break;
      // skip white space
    }
  }

  if (walkedSomeBody && (!bodyTokenPath || bodyTokenPath.length === 0) && !forceEndOfUrl) {
    // we had some content and still no path -> the cursor is position after a closed body -> no auto complete
    return {};
  }

  ret.urlTokenPath = [];

  if (tokenIter.getCurrentPosition().lineNumber === startPos.lineNumber) {
    if (t && (t.type === 'url.part' || t.type === 'url.param' || t.type === 'url.value')) {
      // we are forcing the end of the url for the purposes of determining an endpoint
      if (forceEndOfUrl && t.type === 'url.part') {
        ret.urlTokenPath.push(t.value);
        ret.urlTokenPath.push(_index.URL_PATH_END_MARKER);
      } // we are on the same line as cursor and dealing with a url. Current token is not part of the context


      t = tokenIter.stepBackward(); // This will force method parsing

      while (t.type === 'whitespace') {
        t = tokenIter.stepBackward();
      }
    }

    bodyTokenPath = null; // no not on a body line.
  }

  ret.bodyTokenPath = bodyTokenPath;
  ret.urlParamsTokenPath = null;
  ret.requestStartRow = tokenIter.getCurrentPosition().lineNumber;
  var curUrlPart;

  while (t && isUrlParamsToken(t)) {
    switch (t.type) {
      case 'url.value':
        if (Array.isArray(curUrlPart)) {
          curUrlPart.unshift(t.value);
        } else if (curUrlPart) {
          curUrlPart = [t.value, curUrlPart];
        } else {
          curUrlPart = t.value;
        }

        break;

      case 'url.comma':
        if (!curUrlPart) {
          curUrlPart = [];
        } else if (!Array.isArray(curUrlPart)) {
          curUrlPart = [curUrlPart];
        }

        break;

      case 'url.param':
        var v = curUrlPart;
        curUrlPart = {};
        curUrlPart[t.value] = v;
        break;

      case 'url.amp':
      case 'url.questionmark':
        if (!ret.urlParamsTokenPath) {
          ret.urlParamsTokenPath = [];
        }

        ret.urlParamsTokenPath.unshift(curUrlPart || {});
        curUrlPart = null;
        break;
    }

    t = tokenIter.stepBackward();
  }

  curUrlPart = null;

  while (t && t.type.indexOf('url') !== -1) {
    switch (t.type) {
      case 'url.part':
        if (Array.isArray(curUrlPart)) {
          curUrlPart.unshift(t.value);
        } else if (curUrlPart) {
          curUrlPart = [t.value, curUrlPart];
        } else {
          curUrlPart = t.value;
        }

        break;

      case 'url.comma':
        if (!curUrlPart) {
          curUrlPart = [];
        } else if (!Array.isArray(curUrlPart)) {
          curUrlPart = [curUrlPart];
        }

        break;

      case 'url.slash':
        if (curUrlPart) {
          ret.urlTokenPath.unshift(curUrlPart);
          curUrlPart = null;
        }

        break;
    }

    t = parser.prevNonEmptyToken(tokenIter);
  }

  if (curUrlPart) {
    ret.urlTokenPath.unshift(curUrlPart);
  }

  if (!ret.bodyTokenPath && !ret.urlParamsTokenPath) {
    if (ret.urlTokenPath.length > 0) {
      //   // started on the url, first token is current token
      ret.otherTokenValues = ret.urlTokenPath[0];
    }
  } else {
    // mark the url as completed.
    ret.urlTokenPath.push(_index.URL_PATH_END_MARKER);
  }

  if (t && t.type === 'method') {
    ret.method = t.value;
  }

  return ret;
} // eslint-disable-next-line


function _default(_ref) {
  var editor = _ref.coreEditor,
      parser = _ref.parser;

  function isUrlPathToken(token) {
    switch ((token || {}).type) {
      case 'url.slash':
      case 'url.comma':
      case 'url.part':
        return true;

      default:
        return false;
    }
  }

  function addMetaToTermsList(list, meta, template) {
    return _lodash.default.map(list, function (t) {
      if (_typeof(t) !== 'object') {
        t = {
          name: t
        };
      }

      return _lodash.default.defaults(t, {
        meta: meta,
        template: template
      });
    });
  }

  function applyTerm(term) {
    var context = term.context; // make sure we get up to date replacement info.

    addReplacementInfoToContext(context, editor.getCurrentPosition(), term.insertValue);
    var termAsString;

    if (context.autoCompleteType === 'body') {
      termAsString = typeof term.insertValue === 'string' ? '"' + term.insertValue + '"' : term.insertValue + '';

      if (term.insertValue === '[' || term.insertValue === '{') {
        termAsString = '';
      }
    } else {
      termAsString = term.insertValue + '';
    }

    var valueToInsert = termAsString;
    var templateInserted = false;

    if (context.addTemplate && !_lodash.default.isUndefined(term.template) && !_lodash.default.isNull(term.template)) {
      var indentedTemplateLines; // In order to allow triple quoted strings in template completion we check the `__raw_`
      // attribute to determine whether this template should go through JSON formatting.

      if (term.template.__raw && term.template.value) {
        indentedTemplateLines = term.template.value.split('\n');
      } else {
        indentedTemplateLines = utils.jsonToString(term.template, true).split('\n');
      }

      var currentIndentation = editor.getLineValue(context.rangeToReplace.start.lineNumber);
      currentIndentation = currentIndentation.match(/^\s*/)[0];

      for (var i = 1; i < indentedTemplateLines.length; i++ // skip first line
      ) {
        indentedTemplateLines[i] = currentIndentation + indentedTemplateLines[i];
      }

      valueToInsert += ': ' + indentedTemplateLines.join('\n');
      templateInserted = true;
    } else {
      templateInserted = true;

      if (term.value === '[') {
        valueToInsert += '[]';
      } else if (term.value === '{') {
        valueToInsert += '{}';
      } else {
        templateInserted = false;
      }
    }

    valueToInsert = context.prefixToAdd + valueToInsert + context.suffixToAdd; // disable listening to the changes we are making.

    editor.off('changeSelection', editorChangeListener);

    if (context.rangeToReplace.start.column !== context.rangeToReplace.end.column) {
      editor.replace(context.rangeToReplace, valueToInsert);
    } else {
      editor.insert(valueToInsert);
    }

    editor.clearSelection(); // for some reason the above changes selection
    // go back to see whether we have one of ( : { & [ do not require a comma. All the rest do.

    var newPos = {
      lineNumber: context.rangeToReplace.start.lineNumber,
      column: context.rangeToReplace.start.column + termAsString.length + context.prefixToAdd.length + (templateInserted ? 0 : context.suffixToAdd.length)
    };
    var tokenIter = (0, _factories.createTokenIterator)({
      editor: editor,
      position: newPos
    });

    if (context.autoCompleteType === 'body') {
      // look for the next place stand, just after a comma, {
      var nonEmptyToken = parser.nextNonEmptyToken(tokenIter);

      switch (nonEmptyToken ? nonEmptyToken.type : 'NOTOKEN') {
        case 'paren.rparen':
          newPos = tokenIter.getCurrentPosition();
          break;

        case 'punctuation.colon':
          nonEmptyToken = parser.nextNonEmptyToken(tokenIter);

          if ((nonEmptyToken || {}).type === 'paren.lparen') {
            nonEmptyToken = parser.nextNonEmptyToken(tokenIter);
            newPos = tokenIter.getCurrentPosition();

            if (nonEmptyToken && nonEmptyToken.value.indexOf('"') === 0) {
              newPos.column++;
            } // don't stand on "

          }

          break;

        case 'paren.lparen':
        case 'punctuation.comma':
          tokenIter.stepForward();
          newPos = tokenIter.getCurrentPosition();
          break;
      }

      editor.moveCursorToPosition(newPos);
    } // re-enable listening to typing


    editor.on('changeSelection', editorChangeListener);
  }

  function getAutoCompleteContext(ctxEditor, pos) {
    // deduces all the parameters need to position and insert the auto complete
    var context = {
      autoCompleteSet: null,
      // instructions for what can be here
      endpoint: null,
      urlPath: null,
      method: null,
      activeScheme: null,
      editor: ctxEditor
    }; //  context.updatedForToken = session.getTokenAt(pos.row, pos.column);
    //
    //  if (!context.updatedForToken)
    //    context.updatedForToken = { value: "", start: pos.column }; // empty line
    //
    //  context.updatedForToken.row = pos.row; // extend

    context.autoCompleteType = getAutoCompleteType(pos);

    switch (context.autoCompleteType) {
      case 'path':
        addPathAutoCompleteSetToContext(context, pos);
        break;

      case 'url_params':
        addUrlParamsAutoCompleteSetToContext(context, pos);
        break;

      case 'method':
        addMethodAutoCompleteSetToContext(context);
        break;

      case 'body':
        addBodyAutoCompleteSetToContext(context, pos);
        break;

      default:
        return null;
    }

    if (!context.autoCompleteSet) {
      return null; // nothing to do..
    }

    addReplacementInfoToContext(context, pos);
    context.createdWithToken = _lodash.default.clone(context.updatedForToken);
    return context;
  }

  function getAutoCompleteType(pos) {
    // return "method", "path" or "body" to determine auto complete type.
    var rowMode = parser.getRowParseMode(); // eslint-disable-next-line no-bitwise

    if (rowMode & parser.MODE.IN_REQUEST) {
      return 'body';
    } // eslint-disable-next-line no-bitwise


    if (rowMode & parser.MODE.REQUEST_START) {
      // on url path, url params or method.
      var tokenIter = (0, _factories.createTokenIterator)({
        editor: editor,
        position: pos
      });
      var t = tokenIter.getCurrentToken();

      while (t.type === 'url.comma') {
        t = tokenIter.stepBackward();
      }

      switch (t.type) {
        case 'method':
          return 'method';

        case 'whitespace':
          t = parser.prevNonEmptyToken(tokenIter);

          switch ((t || {}).type) {
            case 'method':
              // we moved one back
              return 'path';
              break;

            default:
              if (isUrlPathToken(t)) {
                return 'path';
              }

              if (isUrlParamsToken(t)) {
                return 'url_params';
              }

              return null;
          }

          break;

        default:
          if (isUrlPathToken(t)) {
            return 'path';
          }

          if (isUrlParamsToken(t)) {
            return 'url_params';
          }

          return null;
      }
    } // after start to avoid single line url only requests
    // eslint-disable-next-line no-bitwise


    if (rowMode & parser.MODE.REQUEST_END) {
      return 'body';
    } // in between request on an empty


    if (editor.getLineValue(pos.lineNumber).trim() === '') {
      // check if the previous line is a single line beginning of a new request
      rowMode = parser.getRowParseMode(pos.lineNumber - 1); // eslint-disable-next-line no-bitwise

      if ( // eslint-disable-next-line no-bitwise
      rowMode & parser.MODE.REQUEST_START && // eslint-disable-next-line no-bitwise
      rowMode & parser.MODE.REQUEST_END) {
        return 'body';
      } // o.w suggest a method


      return 'method';
    }

    return null;
  }

  function addReplacementInfoToContext(context, pos, replacingTerm) {
    // extract the initial value, rangeToReplace & textBoxPosition
    // Scenarios for current token:
    //   -  Nice token { "bla|"
    //   -  Broken text token {   bla|
    //   -  No token : { |
    //   - Broken scenario { , bla|
    //   - Nice token, broken before: {, "bla"
    context.updatedForToken = _lodash.default.clone(editor.getTokenAt({
      lineNumber: pos.lineNumber,
      column: pos.column
    }));

    if (!context.updatedForToken) {
      context.updatedForToken = {
        value: '',
        type: '',
        position: {
          column: pos.column,
          lineNumber: pos.lineNumber
        }
      };
    } // empty line


    var anchorToken = context.createdWithToken;

    if (!anchorToken) {
      anchorToken = context.updatedForToken;
    }

    switch (context.updatedForToken.type) {
      case 'variable':
      case 'string':
      case 'text':
      case 'constant.numeric':
      case 'constant.language.boolean':
      case 'method':
      case 'url.index':
      case 'url.type':
      case 'url.id':
      case 'url.method':
      case 'url.endpoint':
      case 'url.part':
      case 'url.param':
      case 'url.value':
        context.rangeToReplace = {
          start: {
            lineNumber: pos.lineNumber,
            column: anchorToken.position.column
          },
          end: {
            lineNumber: pos.lineNumber,
            column: context.updatedForToken.position.column + context.updatedForToken.value.length
          }
        };
        context.replacingToken = true;
        break;

      default:
        if (replacingTerm && context.updatedForToken.value === replacingTerm) {
          context.rangeToReplace = {
            start: {
              lineNumber: pos.lineNumber,
              column: anchorToken.column
            },
            end: {
              lineNumber: pos.lineNumber,
              column: context.updatedForToken.position.column + context.updatedForToken.value.length
            }
          };
          context.replacingToken = true;
        } else {
          // standing on white space, quotes or another punctuation - no replacing
          context.rangeToReplace = {
            start: {
              lineNumber: pos.lineNumber,
              column: pos.column
            },
            end: {
              lineNumber: pos.lineNumber,
              column: pos.column
            }
          };
          context.replacingToken = false;
        }

        break;
    }

    context.textBoxPosition = {
      lineNumber: context.rangeToReplace.start.lineNumber,
      column: context.rangeToReplace.start.column
    };

    switch (context.autoCompleteType) {
      case 'path':
        addPathPrefixSuffixToContext(context);
        break;

      case 'url_params':
        addUrlParamsPrefixSuffixToContext(context);
        break;

      case 'method':
        addMethodPrefixSuffixToContext(context);
        break;

      case 'body':
        addBodyPrefixSuffixToContext(context);
        break;
    }
  }

  function addBodyPrefixSuffixToContext(context) {
    // Figure out what happens next to the token to see whether it needs trailing commas etc.
    // Templates will be used if not destroying existing structure.
    // -> token : {} or token ]/} or token , but not token : SOMETHING ELSE
    context.prefixToAdd = '';
    context.suffixToAdd = '';
    var tokenIter = (0, _factories.createTokenIterator)({
      editor: editor,
      position: editor.getCurrentPosition()
    });
    var nonEmptyToken = parser.nextNonEmptyToken(tokenIter);

    switch (nonEmptyToken ? nonEmptyToken.type : 'NOTOKEN') {
      case 'NOTOKEN':
      case 'paren.lparen':
      case 'paren.rparen':
      case 'punctuation.comma':
        context.addTemplate = true;
        break;

      case 'punctuation.colon':
        // test if there is an empty object - if so we replace it
        context.addTemplate = false;
        nonEmptyToken = parser.nextNonEmptyToken(tokenIter);

        if (!(nonEmptyToken && nonEmptyToken.value === '{')) {
          break;
        }

        nonEmptyToken = parser.nextNonEmptyToken(tokenIter);

        if (!(nonEmptyToken && nonEmptyToken.value === '}')) {
          break;
        }

        context.addTemplate = true; // extend range to replace to include all up to token

        context.rangeToReplace.end.lineNumber = tokenIter.getCurrentTokenLineNumber();
        context.rangeToReplace.end.column = tokenIter.getCurrentTokenColumn() + nonEmptyToken.value.length; // move one more time to check if we need a trailing comma

        nonEmptyToken = parser.nextNonEmptyToken(tokenIter);

        switch (nonEmptyToken ? nonEmptyToken.type : 'NOTOKEN') {
          case 'NOTOKEN':
          case 'paren.rparen':
          case 'punctuation.comma':
          case 'punctuation.colon':
            break;

          default:
            context.suffixToAdd = ', ';
        }

        break;

      default:
        context.addTemplate = true;
        context.suffixToAdd = ', ';
        break;
      // for now play safe and do nothing. May be made smarter.
    } // go back to see whether we have one of ( : { & [ do not require a comma. All the rest do.


    tokenIter = (0, _factories.createTokenIterator)({
      editor: editor,
      position: editor.getCurrentPosition()
    });
    nonEmptyToken = tokenIter.getCurrentToken();
    var insertingRelativeToToken; // -1 is before token, 0 middle, +1 after token

    if (context.replacingToken) {
      insertingRelativeToToken = 0;
    } else {
      var pos = editor.getCurrentPosition();

      if (pos.column === context.updatedForToken.position.column) {
        insertingRelativeToToken = -1;
      } else if (pos.column < context.updatedForToken.position.column + context.updatedForToken.value.length) {
        insertingRelativeToToken = 0;
      } else {
        insertingRelativeToToken = 1;
      }
    } // we should actually look at what's happening before this token


    if (parser.isEmptyToken(nonEmptyToken) || insertingRelativeToToken <= 0) {
      nonEmptyToken = parser.prevNonEmptyToken(tokenIter);
    }

    switch (nonEmptyToken ? nonEmptyToken.type : 'NOTOKEN') {
      case 'NOTOKEN':
      case 'paren.lparen':
      case 'punctuation.comma':
      case 'punctuation.colon':
      case 'method':
        break;

      default:
        if (nonEmptyToken && nonEmptyToken.type.indexOf('url') < 0) {
          context.prefixToAdd = ', ';
        }

    }

    return context;
  }

  function addUrlParamsPrefixSuffixToContext(context) {
    context.prefixToAdd = '';
    context.suffixToAdd = '';
  }

  function addMethodPrefixSuffixToContext(context) {
    context.prefixToAdd = '';
    context.suffixToAdd = '';
    var tokenIter = (0, _factories.createTokenIterator)({
      editor: editor,
      position: editor.getCurrentPosition()
    });
    var lineNumber = tokenIter.getCurrentPosition().lineNumber;
    var t = parser.nextNonEmptyToken(tokenIter);

    if (tokenIter.getCurrentPosition().lineNumber !== lineNumber || !t) {
      // we still have nothing next to the method, add a space..
      context.suffixToAdd = ' ';
    }
  }

  function addPathPrefixSuffixToContext(context) {
    context.prefixToAdd = '';
    context.suffixToAdd = '';
  }

  function addMethodAutoCompleteSetToContext(context) {
    context.autoCompleteSet = ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'].map(function (m, i) {
      return {
        name: m,
        score: -i,
        meta: _i18n.i18n.translate('console.autocomplete.addMethodMetaText', {
          defaultMessage: 'method'
        })
      };
    });
  }

  function addPathAutoCompleteSetToContext(context, pos) {
    var ret = getCurrentMethodAndTokenPaths(editor, pos, parser);
    context.method = ret.method;
    context.token = ret.token;
    context.otherTokenValues = ret.otherTokenValues;
    context.urlTokenPath = ret.urlTokenPath;
    var components = (0, _kb.getTopLevelUrlCompleteComponents)(context.method);
    (0, _engine.populateContext)(ret.urlTokenPath, context, editor, true, components);
    context.autoCompleteSet = addMetaToTermsList(context.autoCompleteSet, 'endpoint');
  }

  function addUrlParamsAutoCompleteSetToContext(context, pos) {
    var ret = getCurrentMethodAndTokenPaths(editor, pos, parser);
    context.method = ret.method;
    context.otherTokenValues = ret.otherTokenValues;
    context.urlTokenPath = ret.urlTokenPath;

    if (!ret.urlTokenPath) {
      // zero length tokenPath is true
      return context;
    }

    (0, _engine.populateContext)(ret.urlTokenPath, context, editor, false, (0, _kb.getTopLevelUrlCompleteComponents)(context.method));

    if (!context.endpoint) {
      return context;
    }

    if (!ret.urlParamsTokenPath) {
      // zero length tokenPath is true
      return context;
    }

    var tokenPath = [];
    var currentParam = ret.urlParamsTokenPath.pop();

    if (currentParam) {
      tokenPath = Object.keys(currentParam); // single key object

      context.otherTokenValues = currentParam[tokenPath[0]];
    }

    (0, _engine.populateContext)(tokenPath, context, editor, true, context.endpoint.paramsAutocomplete.getTopLevelComponents(context.method));
    return context;
  }

  function addBodyAutoCompleteSetToContext(context, pos) {
    var ret = getCurrentMethodAndTokenPaths(editor, pos, parser);
    context.method = ret.method;
    context.otherTokenValues = ret.otherTokenValues;
    context.urlTokenPath = ret.urlTokenPath;
    context.requestStartRow = ret.requestStartRow;

    if (!ret.urlTokenPath) {
      // zero length tokenPath is true
      return context;
    }

    (0, _engine.populateContext)(ret.urlTokenPath, context, editor, false, (0, _kb.getTopLevelUrlCompleteComponents)(context.method));
    context.bodyTokenPath = ret.bodyTokenPath;

    if (!ret.bodyTokenPath) {
      // zero length tokenPath is true
      return context;
    } // needed for scope linking + global term resolving


    context.endpointComponentResolver = _kb.getEndpointBodyCompleteComponents;
    context.globalComponentResolver = _kb.getGlobalAutocompleteComponents;
    var components;

    if (context.endpoint) {
      components = context.endpoint.bodyAutocompleteRootComponents;
    } else {
      components = (0, _kb.getUnmatchedEndpointComponents)();
    }

    (0, _engine.populateContext)(ret.bodyTokenPath, context, editor, true, components);
    return context;
  }

  var evaluateCurrentTokenAfterAChange = _lodash.default.debounce(function evaluateCurrentTokenAfterAChange(pos) {
    var currentToken = editor.getTokenAt(pos);

    if (!currentToken) {
      if (pos.lineNumber === 1) {
        LAST_EVALUATED_TOKEN = null;
        return;
      }

      currentToken = {
        position: {
          column: 0,
          lineNumber: 0
        },
        value: '',
        type: ''
      }; // empty row
    }

    currentToken.position.lineNumber = pos.lineNumber; // extend token with row. Ace doesn't supply it by default

    if (parser.isEmptyToken(currentToken)) {
      // empty token. check what's coming next
      var nextToken = editor.getTokenAt(_objectSpread({}, pos, {
        column: pos.column + 1
      }));

      if (parser.isEmptyToken(nextToken)) {
        // Empty line, or we're not on the edge of current token. Save the current position as base
        currentToken.position.column = pos.column;
        LAST_EVALUATED_TOKEN = currentToken;
      } else {
        nextToken.position.lineNumber = pos.lineNumber;
        LAST_EVALUATED_TOKEN = nextToken;
      }

      return;
    }

    if (!LAST_EVALUATED_TOKEN) {
      LAST_EVALUATED_TOKEN = currentToken;
      return; // wait for the next typing.
    }

    if (LAST_EVALUATED_TOKEN.position.column !== currentToken.position.column || LAST_EVALUATED_TOKEN.position.lineNumber !== currentToken.position.lineNumber || LAST_EVALUATED_TOKEN.value === currentToken.value) {
      // not on the same place or nothing changed, cache and wait for the next time
      LAST_EVALUATED_TOKEN = currentToken;
      return;
    } // don't automatically open the auto complete if some just hit enter (new line) or open a parentheses


    switch (currentToken.type || 'UNKNOWN') {
      case 'paren.lparen':
      case 'paren.rparen':
      case 'punctuation.colon':
      case 'punctuation.comma':
      case 'UNKNOWN':
        return;
    }

    LAST_EVALUATED_TOKEN = currentToken;
    editor.execCommand('startAutocomplete');
  }, 100);

  function editorChangeListener() {
    var position = editor.getCurrentPosition();

    if (position && !editor.isCompleterActive()) {
      evaluateCurrentTokenAfterAChange(position);
    }
  }

  function getCompletions(DO_NOT_USE, DO_NOT_USE_SESSION, pos, prefix, callback) {
    var position = {
      lineNumber: pos.row + 1,
      column: pos.column + 1
    };

    try {
      var context = getAutoCompleteContext(editor, position);

      if (!context) {
        callback(null, []);
      } else {
        var terms = _lodash.default.map(context.autoCompleteSet.filter(function (term) {
          return Boolean(term) && term.name != null;
        }), function (term) {
          if (_typeof(term) !== 'object') {
            term = {
              name: term
            };
          } else {
            term = _lodash.default.clone(term);
          }

          var defaults = {
            value: term.name,
            meta: 'API',
            score: 0,
            context: context
          }; // we only need our custom insertMatch behavior for the body

          if (context.autoCompleteType === 'body') {
            defaults.completer = {
              insertMatch: function insertMatch() {
                return applyTerm(term);
              }
            };
          }

          return _lodash.default.defaults(term, defaults);
        });

        terms.sort(function (t1, t2) {
          /* score sorts from high to low */
          if (t1.score > t2.score) {
            return -1;
          }

          if (t1.score < t2.score) {
            return 1;
          }
          /* names sort from low to high */


          if (t1.name < t2.name) {
            return -1;
          }

          if (t1.name === t2.name) {
            return 0;
          }

          return 1;
        });
        callback(null, _lodash.default.map(terms, function (t, i) {
          t.insertValue = t.insertValue || t.value;
          t.value = '' + t.value; // normalize to strings

          t.score = -i;
          return t;
        }));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      callback(e, null);
    }
  }

  editor.on('changeSelection', editorChangeListener); // Hook into Ace
  // disable standard context based autocompletion.
  // @ts-ignore

  _brace.default.define('ace/autocomplete/text_completer', ['require', 'exports', 'module'], function (require, exports) {
    exports.getCompletions = function (innerEditor, session, pos, prefix, callback) {
      callback(null, []);
    };
  });

  var langTools = _brace.default.acequire('ace/ext/language_tools');

  langTools.setCompleters([{
    identifierRegexps: [/[a-zA-Z_0-9\.\$\-\u00A2-\uFFFF]/],
    getCompletions: getCompletions
  }]);
  return {
    _test: {
      getCompletions: getCompletions,
      addReplacementInfoToContext: addReplacementInfoToContext,
      addChangeListener: function addChangeListener() {
        return editor.on('changeSelection', editorChangeListener);
      },
      removeChangeListener: function removeChangeListener() {
        return editor.off('changeSelection', editorChangeListener);
      }
    }
  };
}