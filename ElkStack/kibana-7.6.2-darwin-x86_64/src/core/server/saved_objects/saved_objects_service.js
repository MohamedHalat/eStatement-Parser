"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsService = void 0;

var _operators = require("rxjs/operators");

var _ = require("./");

var _migrations = require("./migrations");

var _retry_call_cluster = require("../elasticsearch/retry_call_cluster");

var _repository = require("./service/lib/repository");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SavedObjectsService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "migrator", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "clientProvider", void 0);

    _defineProperty(this, "setupDeps", void 0);

    this.logger = coreContext.logger.get('savedobjects-service');
  }

  async setup(setupDeps, migrationsRetryDelay) {
    this.logger.debug('Setting up SavedObjects service');
    this.setupDeps = setupDeps;
    const {
      savedObjectSchemas: savedObjectsSchemasDefinition,
      savedObjectMappings,
      savedObjectMigrations,
      savedObjectValidations
    } = setupDeps.legacyPlugins.uiExports;
    const savedObjectSchemas = new _.SavedObjectsSchema(savedObjectsSchemasDefinition);
    const kibanaConfig = await this.coreContext.configService.atPath('kibana').pipe((0, _operators.first)()).toPromise();
    const savedObjectsConfig = await this.coreContext.configService.atPath('migrations').pipe((0, _operators.first)()).toPromise();
    const adminClient = setupDeps.elasticsearch.adminClient;
    const migrator = this.migrator = new _migrations.KibanaMigrator({
      savedObjectSchemas,
      savedObjectMappings,
      savedObjectMigrations,
      savedObjectValidations,
      logger: this.logger,
      kibanaVersion: this.coreContext.env.packageInfo.version,
      config: setupDeps.legacyPlugins.pluginExtendedConfig,
      savedObjectsConfig,
      kibanaConfig,
      callCluster: (0, _retry_call_cluster.migrationsRetryCallCluster)(adminClient.callAsInternalUser, this.logger, migrationsRetryDelay)
    });

    const createSORepository = (callCluster, extraTypes = []) => {
      return _repository.SavedObjectsRepository.createRepository(migrator, savedObjectSchemas, setupDeps.legacyPlugins.pluginExtendedConfig, kibanaConfig.index, callCluster, extraTypes);
    };

    this.clientProvider = new _.SavedObjectsClientProvider({
      defaultClientFactory({
        request
      }) {
        const repository = createSORepository(adminClient.asScoped(request).callAsCurrentUser);
        return new _.SavedObjectsClient(repository);
      }

    });
    return {
      getScopedClient: this.clientProvider.getClient.bind(this.clientProvider),
      setClientFactory: this.clientProvider.setClientFactory.bind(this.clientProvider),
      addClientWrapper: this.clientProvider.addClientWrapperFactory.bind(this.clientProvider),
      createInternalRepository: extraTypes => createSORepository(adminClient.callAsInternalUser, extraTypes),
      createScopedRepository: (req, extraTypes) => createSORepository(adminClient.asScoped(req).callAsCurrentUser, extraTypes)
    };
  }

  async start(core) {
    if (!this.clientProvider) {
      throw new Error('#setup() needs to be run first');
    }

    this.logger.debug('Starting SavedObjects service');
    /**
     * Note: We want to ensure that migrations have completed before
     * continuing with further Core startup steps that might use SavedObjects
     * such as running the legacy server, legacy plugins and allowing incoming
     * HTTP requests.
     *
     * However, our build system optimize step and some tests depend on the
     * HTTP server running without an Elasticsearch server being available.
     * So, when the `migrations.skip` is true, we skip migrations altogether.
     */

    const cliArgs = this.coreContext.env.cliArgs;
    const savedObjectsConfig = await this.coreContext.configService.atPath('migrations').pipe((0, _operators.first)()).toPromise();
    const skipMigrations = cliArgs.optimize || savedObjectsConfig.skip;

    if (skipMigrations) {
      this.logger.warn('Skipping Saved Object migrations on startup. Note: Individual documents will still be migrated when read or written.');
    } else {
      this.logger.info('Waiting until all Elasticsearch nodes are compatible with Kibana before starting saved objects migrations...'); // TODO: Move to Status Service https://github.com/elastic/kibana/issues/41983

      this.setupDeps.elasticsearch.esNodesCompatibility$.subscribe(({
        isCompatible,
        message
      }) => {
        if (!isCompatible && message) {
          this.logger.error(message);
        }
      });
      await this.setupDeps.elasticsearch.esNodesCompatibility$.pipe((0, _operators.filter)(nodes => nodes.isCompatible), (0, _operators.take)(1)).toPromise();
      this.logger.info('Starting saved objects migrations');
      await this.migrator.runMigrations();
    }

    return {
      migrator: this.migrator,
      clientProvider: this.clientProvider,
      getScopedClient: this.clientProvider.getClient.bind(this.clientProvider)
    };
  }

  async stop() {}

}

exports.SavedObjectsService = SavedObjectsService;