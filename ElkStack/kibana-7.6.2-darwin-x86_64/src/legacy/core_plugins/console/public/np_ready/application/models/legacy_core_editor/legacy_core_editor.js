"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyCoreEditor = void 0;

var _brace = _interopRequireDefault(require("brace"));

var _jquery = _interopRequireDefault(require("jquery"));

var _ace_token_provider = require("../../../lib/ace_token_provider");

var curl = _interopRequireWildcard(require("../sense_editor/curl"));

var _smart_resize = _interopRequireDefault(require("./smart_resize"));

var InputMode = _interopRequireWildcard(require("./mode/input"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _AceRange = _brace.default.acequire('ace/range').Range;

var rangeToAceRange = function rangeToAceRange(_ref) {
  var start = _ref.start,
      end = _ref.end;
  return new _AceRange(start.lineNumber - 1, start.column - 1, end.lineNumber - 1, end.column - 1);
};

var LegacyCoreEditor =
/*#__PURE__*/
function () {
  function LegacyCoreEditor(editor, actions) {
    var _this = this;

    _classCallCheck(this, LegacyCoreEditor);

    this.editor = editor;

    _defineProperty(this, "_aceOnPaste", void 0);

    _defineProperty(this, "$actions", void 0);

    _defineProperty(this, "resize", void 0);

    _defineProperty(this, "setActionsBar", function (value) {
      var topOrBottom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

      if (value === null) {
        _this.$actions.css('visibility', 'hidden');
      } else {
        if (topOrBottom === 'top') {
          _this.$actions.css({
            bottom: 'auto',
            top: value,
            visibility: 'visible'
          });
        } else {
          _this.$actions.css({
            top: 'auto',
            bottom: value,
            visibility: 'visible'
          });
        }
      }
    });

    _defineProperty(this, "hideActionsBar", function () {
      _this.setActionsBar();
    });

    this.$actions = (0, _jquery.default)(actions);
    this.editor.setShowPrintMargin(false);
    var session = this.editor.getSession();
    session.setMode(new InputMode.Mode());
    session.setFoldStyle('markbeginend');
    session.setTabSize(2);
    session.setUseWrapMode(true);
    this.resize = (0, _smart_resize.default)(this.editor); // Intercept ace on paste handler.

    this._aceOnPaste = this.editor.onPaste;
    this.editor.onPaste = this.DO_NOT_USE_onPaste.bind(this);
    this.editor.setOptions({
      enableBasicAutocompletion: true
    });
    this.editor.$blockScrolling = Infinity;
    this.hideActionsBar();
    this.editor.focus();
  } // dirty check for tokenizer state, uses a lot less cycles
  // than listening for tokenizerUpdate


  _createClass(LegacyCoreEditor, [{
    key: "waitForLatestTokens",
    value: function waitForLatestTokens() {
      var _this2 = this;

      return new Promise(function (resolve) {
        var session = _this2.editor.getSession();

        var checkInterval = 25;

        var check = function check() {
          // If the bgTokenizer doesn't exist, we can assume that the underlying editor has been
          // torn down, e.g. by closing the History tab, and we don't need to do anything further.
          if (session.bgTokenizer) {
            // Wait until the bgTokenizer is done running before executing the callback.
            if (session.bgTokenizer.running) {
              setTimeout(check, checkInterval);
            } else {
              resolve();
            }
          }
        };

        setTimeout(check, 0);
      });
    }
  }, {
    key: "getLineState",
    value: function getLineState(lineNumber) {
      var session = this.editor.getSession();
      return session.getState(lineNumber - 1);
    }
  }, {
    key: "getValueInRange",
    value: function getValueInRange(range) {
      return this.editor.getSession().getTextRange(rangeToAceRange(range));
    }
  }, {
    key: "getTokenProvider",
    value: function getTokenProvider() {
      return new _ace_token_provider.AceTokensProvider(this.editor.getSession());
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.editor.getValue();
    }
  }, {
    key: "setValue",
    value: function setValue(text, forceRetokenize) {
      var session;
      return regeneratorRuntime.async(function setValue$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              session = this.editor.getSession();
              session.setValue(text);

              if (!forceRetokenize) {
                _context.next = 5;
                break;
              }

              _context.next = 5;
              return regeneratorRuntime.awrap(this.forceRetokenize());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getLineValue",
    value: function getLineValue(lineNumber) {
      var session = this.editor.getSession();
      return session.getLine(lineNumber - 1);
    }
  }, {
    key: "getCurrentPosition",
    value: function getCurrentPosition() {
      var cursorPosition = this.editor.getCursorPosition();
      return {
        lineNumber: cursorPosition.row + 1,
        column: cursorPosition.column + 1
      };
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.editor.clearSelection();
    }
  }, {
    key: "getTokenAt",
    value: function getTokenAt(pos) {
      var provider = this.getTokenProvider();
      return provider.getTokenAt(pos);
    }
  }, {
    key: "insert",
    value: function insert(valueOrPos, value) {
      if (typeof valueOrPos === 'string') {
        this.editor.insert(valueOrPos);
        return;
      }

      var document = this.editor.getSession().getDocument();
      document.insert({
        column: valueOrPos.column - 1,
        row: valueOrPos.lineNumber - 1
      }, value || '');
    }
  }, {
    key: "moveCursorToPosition",
    value: function moveCursorToPosition(pos) {
      this.editor.moveCursorToPosition({
        row: pos.lineNumber - 1,
        column: pos.column - 1
      });
    }
  }, {
    key: "replace",
    value: function replace(range, value) {
      var session = this.editor.getSession();
      session.replace(rangeToAceRange(range), value);
    }
  }, {
    key: "getLines",
    value: function getLines(startLine, endLine) {
      var session = this.editor.getSession();
      return session.getLines(startLine - 1, endLine - 1);
    }
  }, {
    key: "replaceRange",
    value: function replaceRange(range, value) {
      var pos = this.editor.getCursorPosition();
      this.editor.getSession().replace(rangeToAceRange(range), value);
      var maxRow = Math.max(range.start.lineNumber - 1 + value.split('\n').length - 1, 1);
      pos.row = Math.min(pos.row, maxRow);
      this.editor.moveCursorToPosition(pos); // ACE UPGRADE - check if needed - at the moment the above may trigger a selection.

      this.editor.clearSelection();
    }
  }, {
    key: "getSelectionRange",
    value: function getSelectionRange() {
      var result = this.editor.getSelectionRange();
      return {
        start: {
          lineNumber: result.start.row + 1,
          column: result.start.column + 1
        },
        end: {
          lineNumber: result.end.row + 1,
          column: result.end.column + 1
        }
      };
    }
  }, {
    key: "getLineCount",
    value: function getLineCount() {
      // Only use this function to return line count as it uses
      // a cache.
      return this.editor.getSession().getLength();
    }
  }, {
    key: "addMarker",
    value: function addMarker(range) {
      return this.editor.getSession().addMarker(rangeToAceRange(range), 'ace_snippet-marker', 'fullLine', false);
    }
  }, {
    key: "removeMarker",
    value: function removeMarker(ref) {
      this.editor.getSession().removeMarker(ref);
    }
  }, {
    key: "getWrapLimit",
    value: function getWrapLimit() {
      return this.editor.getSession().getWrapLimit();
    }
  }, {
    key: "on",
    value: function on(event, listener) {
      if (event === 'changeCursor') {
        this.editor.getSession().selection.on(event, listener);
      } else if (event === 'changeSelection') {
        this.editor.on(event, listener);
      } else {
        this.editor.getSession().on(event, listener);
      }
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (event === 'changeSelection') {
        this.editor.off(event, listener);
      }
    }
  }, {
    key: "isCompleterActive",
    value: function isCompleterActive() {
      // Secrets of the arcane here.
      return Boolean(this.editor.completer && this.editor.completer.activated);
    }
  }, {
    key: "forceRetokenize",
    value: function forceRetokenize() {
      var session = this.editor.getSession();
      return new Promise(function (resolve) {
        // force update of tokens, but not on this thread to allow for ace rendering.
        setTimeout(function () {
          var i;

          for (i = 0; i < session.getLength(); i++) {
            session.getTokens(i);
          }

          resolve();
        });
      });
    } // eslint-disable-next-line @typescript-eslint/camelcase

  }, {
    key: "DO_NOT_USE_onPaste",
    value: function DO_NOT_USE_onPaste(text) {
      if (text && curl.detectCURL(text)) {
        var curlInput = curl.parseCURL(text);
        this.editor.insert(curlInput);
        return;
      }

      this._aceOnPaste.call(this.editor, text);
    }
  }, {
    key: "execCommand",
    value: function execCommand(cmd) {
      this.editor.execCommand(cmd);
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.editor.container;
    }
  }, {
    key: "setStyles",
    value: function setStyles(styles) {
      this.editor.getSession().setUseWrapMode(styles.wrapLines);
      this.editor.container.style.fontSize = styles.fontSize;
    }
  }, {
    key: "registerKeyboardShortcut",
    value: function registerKeyboardShortcut(opts) {
      this.editor.commands.addCommand({
        exec: opts.fn,
        name: opts.name,
        bindKey: opts.keys
      });
    }
  }, {
    key: "legacyUpdateUI",
    value: function legacyUpdateUI(range) {
      var _this3 = this;

      if (!this.$actions) {
        return;
      }

      if (range) {
        // elements are positioned relative to the editor's container
        // pageY is relative to page, so subtract the offset
        // from pageY to get the new top value
        var offsetFromPage = (0, _jquery.default)(this.editor.container).offset().top;
        var startLine = range.start.lineNumber;
        var startColumn = range.start.column;
        var firstLine = this.getLineValue(startLine);
        var maxLineLength = this.getWrapLimit() - 5;
        var isWrapping = firstLine.length > maxLineLength;
        var totalOffset = offsetFromPage - (window.pageYOffset || 0);

        var getScreenCoords = function getScreenCoords(line) {
          return _this3.editor.renderer.textToScreenCoordinates(line - 1, startColumn).pageY - totalOffset;
        };

        var topOfReq = getScreenCoords(startLine);

        if (topOfReq >= 0) {
          var _this$editor$containe = this.editor.container.getBoundingClientRect(),
              maxBottom = _this$editor$containe.bottom;

          if (topOfReq > maxBottom - totalOffset) {
            this.setActionsBar(0, 'bottom');
            return;
          }

          var offset = 0;

          if (isWrapping) {
            // Try get the line height of the text area in pixels.
            var textArea = (0, _jquery.default)(this.editor.container.querySelector('textArea'));
            var hasRoomOnNextLine = this.getLineValue(startLine).length < maxLineLength;

            if (textArea && hasRoomOnNextLine) {
              // Line height + the number of wraps we have on a line.
              offset += this.getLineValue(startLine).length * textArea.height();
            } else {
              if (startLine > 1) {
                this.setActionsBar(getScreenCoords(startLine - 1));
                return;
              }

              this.setActionsBar(getScreenCoords(startLine + 1));
              return;
            }
          }

          this.setActionsBar(topOfReq + offset);
          return;
        }

        var bottomOfReq = this.editor.renderer.textToScreenCoordinates(range.end.lineNumber, range.end.column).pageY - offsetFromPage;

        if (bottomOfReq >= 0) {
          this.setActionsBar(0);
          return;
        }
      }
    }
  }]);

  return LegacyCoreEditor;
}();

exports.LegacyCoreEditor = LegacyCoreEditor;