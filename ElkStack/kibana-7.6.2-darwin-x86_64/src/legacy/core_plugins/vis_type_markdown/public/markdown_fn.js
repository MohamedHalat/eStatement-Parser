"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMarkdownVisFn = void 0;

var _i18n = require("@kbn/i18n");

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
var name = 'markdownVis';

var createMarkdownVisFn = function createMarkdownVisFn() {
  return {
    name: name,
    type: 'render',
    context: {
      types: []
    },
    help: _i18n.i18n.translate('visTypeMarkdown.function.help', {
      defaultMessage: 'Markdown visualization'
    }),
    args: {
      markdown: {
        types: ['string'],
        aliases: ['_'],
        required: true,
        help: _i18n.i18n.translate('visTypeMarkdown.function.markdown.help', {
          defaultMessage: 'Markdown to render'
        })
      },
      font: {
        types: ['style'],
        help: _i18n.i18n.translate('visTypeMarkdown.function.font.help', {
          defaultMessage: 'Font settings.'
        }),
        default: "{font size=12}"
      },
      openLinksInNewTab: {
        types: ['boolean'],
        default: false,
        help: _i18n.i18n.translate('visTypeMarkdown.function.openLinksInNewTab.help', {
          defaultMessage: 'Opens links in new tab'
        })
      }
    },
    fn: function fn(context, args) {
      return regeneratorRuntime.async(function fn$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", {
                type: 'render',
                as: 'visualization',
                value: {
                  visType: 'markdown',
                  visConfig: {
                    markdown: args.markdown,
                    openLinksInNewTab: args.openLinksInNewTab,
                    fontSize: parseInt(args.font.spec.fontSize || '12', 10)
                  }
                }
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

exports.createMarkdownVisFn = createMarkdownVisFn;