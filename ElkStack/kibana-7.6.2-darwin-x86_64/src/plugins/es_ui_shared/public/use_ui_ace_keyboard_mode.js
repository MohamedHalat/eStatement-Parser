"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUIAceKeyboardMode = useUIAceKeyboardMode;

var _react = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var OverlayText = function OverlayText() {
  return (// The point of this element is for accessibility purposes, so ignore eslint error
    // in this case
    //
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, "Press Enter to start editing."), _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, "When you\u2019re done, press Escape to stop editing."))
  );
};

function useUIAceKeyboardMode(aceTextAreaElement) {
  var overlayMountNode = (0, _react.useRef)(null);
  var autoCompleteVisibleRef = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    function onDismissOverlay(event) {
      if (event.keyCode === _eui.keyCodes.ENTER) {
        event.preventDefault();
        aceTextAreaElement.focus();
      }
    }

    function enableOverlay() {
      if (overlayMountNode.current) {
        overlayMountNode.current.focus();
      }
    }

    var isAutoCompleteVisible = function isAutoCompleteVisible() {
      var autoCompleter = document.querySelector('.ace_autocomplete');

      if (!autoCompleter) {
        return false;
      } // The autoComplete is just hidden when it's closed, not removed from the DOM.


      return autoCompleter.style.display !== 'none';
    };

    var documentKeyDownListener = function documentKeyDownListener() {
      autoCompleteVisibleRef.current = isAutoCompleteVisible();
    };

    var aceKeydownListener = function aceKeydownListener(event) {
      if (event.keyCode === _eui.keyCodes.ESCAPE && !autoCompleteVisibleRef.current) {
        event.preventDefault();
        event.stopPropagation();
        enableOverlay();
      }
    };

    if (aceTextAreaElement) {
      // We don't control HTML elements inside of ace so we imperatively create an element
      // that acts as a container and insert it just before ace's textarea element
      // so that the overlay lives at the correct spot in the DOM hierarchy.
      overlayMountNode.current = document.createElement('div');
      overlayMountNode.current.className = 'kbnUiAceKeyboardHint';
      overlayMountNode.current.setAttribute('role', 'application');
      overlayMountNode.current.tabIndex = 0;
      overlayMountNode.current.addEventListener('focus', enableOverlay);
      overlayMountNode.current.addEventListener('keydown', onDismissOverlay);
      ReactDOM.render(_react.default.createElement(OverlayText, null), overlayMountNode.current);
      aceTextAreaElement.parentElement.insertBefore(overlayMountNode.current, aceTextAreaElement);
      aceTextAreaElement.setAttribute('tabindex', '-1'); // Order of events:
      // 1. Document capture event fires first and we check whether an autocomplete menu is open on keydown
      //    (not ideal because this is scoped to the entire document).
      // 2. Ace changes it's state (like hiding or showing autocomplete menu)
      // 3. We check what button was pressed and whether autocomplete was visible then determine
      //    whether it should act like a dismiss or if we should display an overlay.

      document.addEventListener('keydown', documentKeyDownListener, {
        capture: true
      });
      aceTextAreaElement.addEventListener('keydown', aceKeydownListener);
    }

    return function () {
      if (aceTextAreaElement) {
        document.removeEventListener('keydown', documentKeyDownListener, {
          capture: true
        });
        aceTextAreaElement.removeEventListener('keydown', aceKeydownListener);
        var textAreaContainer = aceTextAreaElement.parentElement;

        if (textAreaContainer && textAreaContainer.contains(overlayMountNode.current)) {
          textAreaContainer.removeChild(overlayMountNode.current);
        }
      }
    };
  }, [aceTextAreaElement]);
}