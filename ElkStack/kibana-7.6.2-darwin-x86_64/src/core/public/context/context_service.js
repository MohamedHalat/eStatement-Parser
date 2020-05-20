"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextService = void 0;

var _context = require("../../utils/context");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */
var ContextService =
/*#__PURE__*/
function () {
  function ContextService(core) {
    _classCallCheck(this, ContextService);

    this.core = core;
  }

  _createClass(ContextService, [{
    key: "setup",
    value: function setup(_ref) {
      var _this = this;

      var pluginDependencies = _ref.pluginDependencies;
      return {
        createContextContainer: function createContextContainer() {
          return new _context.ContextContainer(pluginDependencies, _this.core.coreId);
        }
      };
    }
  }]);

  return ContextService;
}();
/**
 * {@inheritdoc IContextContainer}
 *
 * @example
 * Say we're creating a plugin for rendering visualizations that allows new rendering methods to be registered. If we
 * want to offer context to these rendering methods, we can leverage the ContextService to manage these contexts.
 * ```ts
 * export interface VizRenderContext {
 *   core: {
 *     i18n: I18nStart;
 *     uiSettings: IUiSettingsClient;
 *   }
 *   [contextName: string]: unknown;
 * }
 *
 * export type VizRenderer = (context: VizRenderContext, domElement: HTMLElement) => () => void;
 * // When a renderer is bound via `contextContainer.createHandler` this is the type that will be returned.
 * type BoundVizRenderer = (domElement: HTMLElement) => () => void;
 *
 * class VizRenderingPlugin {
 *   private readonly contextContainer?: IContextContainer<VizRenderer>;
 *   private readonly vizRenderers = new Map<string, BoundVizRenderer>();
 *
 *   constructor(private readonly initContext: PluginInitializerContext) {}
 *
 *   setup(core) {
 *     this.contextContainer = core.context.createContextContainer();
 *
 *     return {
 *       registerContext: this.contextContainer.registerContext,
 *       registerVizRenderer: (plugin: PluginOpaqueId, renderMethod: string, renderer: VizTypeRenderer) =>
 *         this.vizRenderers.set(renderMethod, this.contextContainer.createHandler(plugin, renderer)),
 *     };
 *   }
 *
 *   start(core) {
 *     // Register the core context available to all renderers. Use the VizRendererContext's opaqueId as the first arg.
 *     this.contextContainer.registerContext(this.initContext.opaqueId, 'core', () => ({
 *       i18n: core.i18n,
 *       uiSettings: core.uiSettings
 *     }));
 *
 *     return {
 *       registerContext: this.contextContainer.registerContext,
 *
 *       renderVizualization: (renderMethod: string, domElement: HTMLElement) => {
 *         if (!this.vizRenderer.has(renderMethod)) {
 *           throw new Error(`Render method '${renderMethod}' has not been registered`);
 *         }
 *
 *         // The handler can now be called directly with only an `HTMLElement` and will automatically
 *         // have a new `context` object created and populated by the context container.
 *         const handler = this.vizRenderers.get(renderMethod)
 *         return handler(domElement);
 *       }
 *     };
 *   }
 * }
 * ```
 *
 * @public
 */


exports.ContextService = ContextService;