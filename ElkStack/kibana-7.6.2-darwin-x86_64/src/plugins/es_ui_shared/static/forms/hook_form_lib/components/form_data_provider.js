"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormDataProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _form_context = require("../form_context");

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
const FormDataProvider = _react.default.memo(({
  children,
  pathsToWatch
}) => {
  const [formData, setFormData] = (0, _react.useState)({});
  const previousRawData = (0, _react.useRef)({});
  const form = (0, _form_context.useFormContext)();
  (0, _react.useEffect)(() => {
    const subscription = form.subscribe(({
      data: {
        raw
      }
    }) => {
      // To avoid re-rendering the children for updates on the form data
      // that we are **not** interested in, we can specify one or multiple path(s)
      // to watch.
      if (pathsToWatch) {
        const valuesToWatchArray = Array.isArray(pathsToWatch) ? pathsToWatch : [pathsToWatch];

        if (valuesToWatchArray.some(value => previousRawData.current[value] !== raw[value])) {
          previousRawData.current = raw;
          setFormData(raw);
        }
      } else {
        setFormData(raw);
      }
    });
    return subscription.unsubscribe;
  }, [form, pathsToWatch]);
  return children(formData);
});

exports.FormDataProvider = FormDataProvider;