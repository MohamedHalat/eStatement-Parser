
/**
 * Kibana entry file
 *
 * This is programmatically created and updated, do not modify
 *
 * context: {
  "appExtensions": {
    "devTools": [
      "absolute:src/legacy/core_plugins/console/public/legacy"
    ],
    "fieldFormatEditors": [
      "ui/field_editor/components/field_format_editor/register"
    ],
    "hacks": [
      "absolute:src/legacy/core_plugins/input_control_vis/public/legacy",
      "absolute:src/legacy/core_plugins/region_map/public/legacy",
      "absolute:src/legacy/core_plugins/tile_map/public/legacy",
      "absolute:src/legacy/core_plugins/timelion/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_markdown/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_metric/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_table/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_tagcloud/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_timeseries/public/legacy",
      "absolute:src/legacy/core_plugins/vis_type_vega/public/legacy",
      "plugins/kibana/dev_tools",
      "plugins/kibana/discover",
      "plugins/kibana/visualize",
      "plugins/telemetry/hacks/telemetry_init",
      "plugins/telemetry/hacks/telemetry_opt_in"
    ],
    "interpreter": [
      "plugins/data/search/expressions/boot",
      "plugins/kbn_vislib_vis_types/pie_fn",
      "plugins/kbn_vislib_vis_types/vislib_fn",
      "plugins/visualizations/expressions/boot"
    ],
    "managementSections": [
      "plugins/telemetry/views/management"
    ],
    "savedObjectTypes": [
      "plugins/kibana/dashboard/saved_dashboard/saved_dashboard_register",
      "plugins/kibana/visualize/saved_visualizations/saved_visualization_register"
    ],
    "search": [
      "ui/courier/search_strategy/default_search_strategy"
    ],
    "visTypes": [
      "plugins/kbn_vislib_vis_types/kbn_vislib_vis_types"
    ]
  },
  "buildNum": 29199,
  "env": "production",
  "kbnVersion": "7.6.2"
}
 */

import { i18n } from '@kbn/i18n';
import { CoreSystem } from '__kibanaCore__'

const injectedMetadata = JSON.parse(document.querySelector('kbn-injected-metadata').getAttribute('data'));

i18n.load(injectedMetadata.i18n.translationsUrl)
  .catch(e => e)
  .then((i18nError) => {
    const coreSystem = new CoreSystem({
      injectedMetadata,
      rootDomElement: document.body,
      browserSupportsCsp: !window.__kbnCspNotEnforced__,
      requireLegacyFiles: () => {
        require('plugins/timelion/app');
      }
    });

    coreSystem
      .setup()
      .then((coreSetup) => {
        if (i18nError) {
          coreSetup.fatalErrors.add(i18nError);
        }

        return coreSystem.start();
      });
  });
