"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ClusterClient: true,
  IClusterClient: true,
  ICustomClusterClient: true,
  Headers: true,
  ScopedClusterClient: true,
  IScopedClusterClient: true,
  ElasticsearchClientConfig: true,
  ElasticsearchError: true,
  ElasticsearchErrorHelpers: true,
  ElasticsearchServiceSetup: true,
  APICaller: true,
  FakeRequest: true,
  ScopeableRequest: true,
  AuthenticationHandler: true,
  AuthHeaders: true,
  AuthResultParams: true,
  AuthStatus: true,
  AuthToolkit: true,
  AuthResult: true,
  AuthResultType: true,
  Authenticated: true,
  BasePath: true,
  IBasePath: true,
  CustomHttpResponseOptions: true,
  GetAuthHeaders: true,
  GetAuthState: true,
  HttpResponseOptions: true,
  HttpResponsePayload: true,
  HttpServiceSetup: true,
  HttpServiceStart: true,
  ErrorHttpResponseOptions: true,
  IKibanaSocket: true,
  IsAuthenticated: true,
  KibanaRequest: true,
  KibanaRequestEvents: true,
  KibanaRequestRoute: true,
  KibanaRequestRouteOptions: true,
  IKibanaResponse: true,
  LifecycleResponseFactory: true,
  KnownHeaders: true,
  LegacyRequest: true,
  OnPreAuthHandler: true,
  OnPreAuthToolkit: true,
  OnPostAuthHandler: true,
  OnPostAuthToolkit: true,
  OnPreResponseHandler: true,
  OnPreResponseToolkit: true,
  OnPreResponseExtensions: true,
  OnPreResponseInfo: true,
  RedirectResponseOptions: true,
  RequestHandler: true,
  RequestHandlerContextContainer: true,
  RequestHandlerContextProvider: true,
  ResponseError: true,
  ResponseErrorAttributes: true,
  ResponseHeaders: true,
  kibanaResponseFactory: true,
  KibanaResponseFactory: true,
  RouteConfig: true,
  IRouter: true,
  RouteRegistrar: true,
  RouteMethod: true,
  RouteConfigOptions: true,
  RouteConfigOptionsBody: true,
  RouteContentType: true,
  validBodyOutput: true,
  RouteValidatorConfig: true,
  RouteValidationSpec: true,
  RouteValidationFunction: true,
  RouteValidatorOptions: true,
  RouteValidatorFullConfig: true,
  RouteValidationResultFactory: true,
  RouteValidationError: true,
  SessionStorage: true,
  SessionStorageCookieOptions: true,
  SessionCookieValidationResult: true,
  SessionStorageFactory: true,
  IScopedRenderingClient: true,
  RenderingServiceSetup: true,
  IRenderOptions: true,
  PluginsServiceSetup: true,
  PluginsServiceStart: true,
  PluginOpaqueId: true,
  DiscoveredPlugin: true,
  Plugin: true,
  PluginConfigDescriptor: true,
  PluginConfigSchema: true,
  PluginInitializer: true,
  PluginInitializerContext: true,
  PluginManifest: true,
  PluginName: true,
  SharedGlobalConfig: true,
  ContextSetup: true,
  IContextContainer: true,
  IContextProvider: true,
  HandlerFunction: true,
  HandlerContextType: true,
  HandlerParameters: true,
  IUiSettingsClient: true,
  UiSettingsParams: true,
  UiSettingsType: true,
  UiSettingsServiceSetup: true,
  UiSettingsServiceStart: true,
  UserProvidedValues: true,
  SavedObjectsBulkCreateObject: true,
  SavedObjectsBulkGetObject: true,
  SavedObjectsBulkUpdateObject: true,
  SavedObjectsBulkUpdateOptions: true,
  SavedObjectsBulkResponse: true,
  SavedObjectsBulkUpdateResponse: true,
  SavedObjectsClient: true,
  SavedObjectsClientProviderOptions: true,
  SavedObjectsClientWrapperFactory: true,
  SavedObjectsClientWrapperOptions: true,
  SavedObjectsClientFactory: true,
  SavedObjectsCreateOptions: true,
  SavedObjectsErrorHelpers: true,
  SavedObjectsExportOptions: true,
  SavedObjectsExportResultDetails: true,
  SavedObjectsFindResponse: true,
  SavedObjectsImportConflictError: true,
  SavedObjectsImportError: true,
  SavedObjectsImportMissingReferencesError: true,
  SavedObjectsImportOptions: true,
  SavedObjectsImportResponse: true,
  SavedObjectsImportRetry: true,
  SavedObjectsImportUnknownError: true,
  SavedObjectsImportUnsupportedTypeError: true,
  SavedObjectsMigrationLogger: true,
  SavedObjectsRawDoc: true,
  SavedObjectsResolveImportErrorsOptions: true,
  SavedObjectsSchema: true,
  SavedObjectsSerializer: true,
  SavedObjectsLegacyService: true,
  SavedObjectsUpdateOptions: true,
  SavedObjectsUpdateResponse: true,
  SavedObjectsServiceStart: true,
  SavedObjectsServiceSetup: true,
  SavedObjectsDeleteOptions: true,
  ISavedObjectsRepository: true,
  SavedObjectsRepository: true,
  SavedObjectsDeleteByNamespaceOptions: true,
  SavedObjectsIncrementCounterOptions: true,
  CapabilitiesSetup: true,
  CapabilitiesStart: true,
  Capabilities: true,
  CapabilitiesProvider: true,
  CapabilitiesSwitcher: true,
  UuidServiceSetup: true,
  bootstrap: true,
  ConfigPath: true,
  ConfigService: true,
  ConfigDeprecation: true,
  ConfigDeprecationProvider: true,
  ConfigDeprecationLogger: true,
  ConfigDeprecationFactory: true,
  EnvironmentMode: true,
  PackageInfo: true,
  CoreId: true,
  CspConfig: true,
  ICspConfig: true,
  Logger: true,
  LoggerFactory: true,
  LogMeta: true,
  LogRecord: true,
  LogLevel: true,
  RecursiveReadonly: true,
  SavedObject: true,
  SavedObjectAttribute: true,
  SavedObjectAttributes: true,
  SavedObjectAttributeSingle: true,
  SavedObjectReference: true,
  SavedObjectsBaseOptions: true,
  MutatingOperationRefreshSetting: true,
  SavedObjectsClientContract: true,
  SavedObjectsFindOptions: true,
  SavedObjectsMigrationVersion: true,
  LegacyServiceSetupDeps: true,
  LegacyServiceStartDeps: true,
  LegacyServiceDiscoverPlugins: true,
  LegacyConfig: true,
  LegacyUiExports: true,
  LegacyInternals: true
};
Object.defineProperty(exports, "ClusterClient", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ClusterClient;
  }
});
Object.defineProperty(exports, "IClusterClient", {
  enumerable: true,
  get: function () {
    return _elasticsearch.IClusterClient;
  }
});
Object.defineProperty(exports, "ICustomClusterClient", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ICustomClusterClient;
  }
});
Object.defineProperty(exports, "Headers", {
  enumerable: true,
  get: function () {
    return _elasticsearch.Headers;
  }
});
Object.defineProperty(exports, "ScopedClusterClient", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ScopedClusterClient;
  }
});
Object.defineProperty(exports, "IScopedClusterClient", {
  enumerable: true,
  get: function () {
    return _elasticsearch.IScopedClusterClient;
  }
});
Object.defineProperty(exports, "ElasticsearchClientConfig", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ElasticsearchClientConfig;
  }
});
Object.defineProperty(exports, "ElasticsearchError", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ElasticsearchError;
  }
});
Object.defineProperty(exports, "ElasticsearchErrorHelpers", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ElasticsearchErrorHelpers;
  }
});
Object.defineProperty(exports, "ElasticsearchServiceSetup", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ElasticsearchServiceSetup;
  }
});
Object.defineProperty(exports, "APICaller", {
  enumerable: true,
  get: function () {
    return _elasticsearch.APICaller;
  }
});
Object.defineProperty(exports, "FakeRequest", {
  enumerable: true,
  get: function () {
    return _elasticsearch.FakeRequest;
  }
});
Object.defineProperty(exports, "ScopeableRequest", {
  enumerable: true,
  get: function () {
    return _elasticsearch.ScopeableRequest;
  }
});
Object.defineProperty(exports, "AuthenticationHandler", {
  enumerable: true,
  get: function () {
    return _http.AuthenticationHandler;
  }
});
Object.defineProperty(exports, "AuthHeaders", {
  enumerable: true,
  get: function () {
    return _http.AuthHeaders;
  }
});
Object.defineProperty(exports, "AuthResultParams", {
  enumerable: true,
  get: function () {
    return _http.AuthResultParams;
  }
});
Object.defineProperty(exports, "AuthStatus", {
  enumerable: true,
  get: function () {
    return _http.AuthStatus;
  }
});
Object.defineProperty(exports, "AuthToolkit", {
  enumerable: true,
  get: function () {
    return _http.AuthToolkit;
  }
});
Object.defineProperty(exports, "AuthResult", {
  enumerable: true,
  get: function () {
    return _http.AuthResult;
  }
});
Object.defineProperty(exports, "AuthResultType", {
  enumerable: true,
  get: function () {
    return _http.AuthResultType;
  }
});
Object.defineProperty(exports, "Authenticated", {
  enumerable: true,
  get: function () {
    return _http.Authenticated;
  }
});
Object.defineProperty(exports, "BasePath", {
  enumerable: true,
  get: function () {
    return _http.BasePath;
  }
});
Object.defineProperty(exports, "IBasePath", {
  enumerable: true,
  get: function () {
    return _http.IBasePath;
  }
});
Object.defineProperty(exports, "CustomHttpResponseOptions", {
  enumerable: true,
  get: function () {
    return _http.CustomHttpResponseOptions;
  }
});
Object.defineProperty(exports, "GetAuthHeaders", {
  enumerable: true,
  get: function () {
    return _http.GetAuthHeaders;
  }
});
Object.defineProperty(exports, "GetAuthState", {
  enumerable: true,
  get: function () {
    return _http.GetAuthState;
  }
});
Object.defineProperty(exports, "HttpResponseOptions", {
  enumerable: true,
  get: function () {
    return _http.HttpResponseOptions;
  }
});
Object.defineProperty(exports, "HttpResponsePayload", {
  enumerable: true,
  get: function () {
    return _http.HttpResponsePayload;
  }
});
Object.defineProperty(exports, "HttpServiceSetup", {
  enumerable: true,
  get: function () {
    return _http.HttpServiceSetup;
  }
});
Object.defineProperty(exports, "HttpServiceStart", {
  enumerable: true,
  get: function () {
    return _http.HttpServiceStart;
  }
});
Object.defineProperty(exports, "ErrorHttpResponseOptions", {
  enumerable: true,
  get: function () {
    return _http.ErrorHttpResponseOptions;
  }
});
Object.defineProperty(exports, "IKibanaSocket", {
  enumerable: true,
  get: function () {
    return _http.IKibanaSocket;
  }
});
Object.defineProperty(exports, "IsAuthenticated", {
  enumerable: true,
  get: function () {
    return _http.IsAuthenticated;
  }
});
Object.defineProperty(exports, "KibanaRequest", {
  enumerable: true,
  get: function () {
    return _http.KibanaRequest;
  }
});
Object.defineProperty(exports, "KibanaRequestEvents", {
  enumerable: true,
  get: function () {
    return _http.KibanaRequestEvents;
  }
});
Object.defineProperty(exports, "KibanaRequestRoute", {
  enumerable: true,
  get: function () {
    return _http.KibanaRequestRoute;
  }
});
Object.defineProperty(exports, "KibanaRequestRouteOptions", {
  enumerable: true,
  get: function () {
    return _http.KibanaRequestRouteOptions;
  }
});
Object.defineProperty(exports, "IKibanaResponse", {
  enumerable: true,
  get: function () {
    return _http.IKibanaResponse;
  }
});
Object.defineProperty(exports, "LifecycleResponseFactory", {
  enumerable: true,
  get: function () {
    return _http.LifecycleResponseFactory;
  }
});
Object.defineProperty(exports, "KnownHeaders", {
  enumerable: true,
  get: function () {
    return _http.KnownHeaders;
  }
});
Object.defineProperty(exports, "LegacyRequest", {
  enumerable: true,
  get: function () {
    return _http.LegacyRequest;
  }
});
Object.defineProperty(exports, "OnPreAuthHandler", {
  enumerable: true,
  get: function () {
    return _http.OnPreAuthHandler;
  }
});
Object.defineProperty(exports, "OnPreAuthToolkit", {
  enumerable: true,
  get: function () {
    return _http.OnPreAuthToolkit;
  }
});
Object.defineProperty(exports, "OnPostAuthHandler", {
  enumerable: true,
  get: function () {
    return _http.OnPostAuthHandler;
  }
});
Object.defineProperty(exports, "OnPostAuthToolkit", {
  enumerable: true,
  get: function () {
    return _http.OnPostAuthToolkit;
  }
});
Object.defineProperty(exports, "OnPreResponseHandler", {
  enumerable: true,
  get: function () {
    return _http.OnPreResponseHandler;
  }
});
Object.defineProperty(exports, "OnPreResponseToolkit", {
  enumerable: true,
  get: function () {
    return _http.OnPreResponseToolkit;
  }
});
Object.defineProperty(exports, "OnPreResponseExtensions", {
  enumerable: true,
  get: function () {
    return _http.OnPreResponseExtensions;
  }
});
Object.defineProperty(exports, "OnPreResponseInfo", {
  enumerable: true,
  get: function () {
    return _http.OnPreResponseInfo;
  }
});
Object.defineProperty(exports, "RedirectResponseOptions", {
  enumerable: true,
  get: function () {
    return _http.RedirectResponseOptions;
  }
});
Object.defineProperty(exports, "RequestHandler", {
  enumerable: true,
  get: function () {
    return _http.RequestHandler;
  }
});
Object.defineProperty(exports, "RequestHandlerContextContainer", {
  enumerable: true,
  get: function () {
    return _http.RequestHandlerContextContainer;
  }
});
Object.defineProperty(exports, "RequestHandlerContextProvider", {
  enumerable: true,
  get: function () {
    return _http.RequestHandlerContextProvider;
  }
});
Object.defineProperty(exports, "ResponseError", {
  enumerable: true,
  get: function () {
    return _http.ResponseError;
  }
});
Object.defineProperty(exports, "ResponseErrorAttributes", {
  enumerable: true,
  get: function () {
    return _http.ResponseErrorAttributes;
  }
});
Object.defineProperty(exports, "ResponseHeaders", {
  enumerable: true,
  get: function () {
    return _http.ResponseHeaders;
  }
});
Object.defineProperty(exports, "kibanaResponseFactory", {
  enumerable: true,
  get: function () {
    return _http.kibanaResponseFactory;
  }
});
Object.defineProperty(exports, "KibanaResponseFactory", {
  enumerable: true,
  get: function () {
    return _http.KibanaResponseFactory;
  }
});
Object.defineProperty(exports, "RouteConfig", {
  enumerable: true,
  get: function () {
    return _http.RouteConfig;
  }
});
Object.defineProperty(exports, "IRouter", {
  enumerable: true,
  get: function () {
    return _http.IRouter;
  }
});
Object.defineProperty(exports, "RouteRegistrar", {
  enumerable: true,
  get: function () {
    return _http.RouteRegistrar;
  }
});
Object.defineProperty(exports, "RouteMethod", {
  enumerable: true,
  get: function () {
    return _http.RouteMethod;
  }
});
Object.defineProperty(exports, "RouteConfigOptions", {
  enumerable: true,
  get: function () {
    return _http.RouteConfigOptions;
  }
});
Object.defineProperty(exports, "RouteConfigOptionsBody", {
  enumerable: true,
  get: function () {
    return _http.RouteConfigOptionsBody;
  }
});
Object.defineProperty(exports, "RouteContentType", {
  enumerable: true,
  get: function () {
    return _http.RouteContentType;
  }
});
Object.defineProperty(exports, "validBodyOutput", {
  enumerable: true,
  get: function () {
    return _http.validBodyOutput;
  }
});
Object.defineProperty(exports, "RouteValidatorConfig", {
  enumerable: true,
  get: function () {
    return _http.RouteValidatorConfig;
  }
});
Object.defineProperty(exports, "RouteValidationSpec", {
  enumerable: true,
  get: function () {
    return _http.RouteValidationSpec;
  }
});
Object.defineProperty(exports, "RouteValidationFunction", {
  enumerable: true,
  get: function () {
    return _http.RouteValidationFunction;
  }
});
Object.defineProperty(exports, "RouteValidatorOptions", {
  enumerable: true,
  get: function () {
    return _http.RouteValidatorOptions;
  }
});
Object.defineProperty(exports, "RouteValidatorFullConfig", {
  enumerable: true,
  get: function () {
    return _http.RouteValidatorFullConfig;
  }
});
Object.defineProperty(exports, "RouteValidationResultFactory", {
  enumerable: true,
  get: function () {
    return _http.RouteValidationResultFactory;
  }
});
Object.defineProperty(exports, "RouteValidationError", {
  enumerable: true,
  get: function () {
    return _http.RouteValidationError;
  }
});
Object.defineProperty(exports, "SessionStorage", {
  enumerable: true,
  get: function () {
    return _http.SessionStorage;
  }
});
Object.defineProperty(exports, "SessionStorageCookieOptions", {
  enumerable: true,
  get: function () {
    return _http.SessionStorageCookieOptions;
  }
});
Object.defineProperty(exports, "SessionCookieValidationResult", {
  enumerable: true,
  get: function () {
    return _http.SessionCookieValidationResult;
  }
});
Object.defineProperty(exports, "SessionStorageFactory", {
  enumerable: true,
  get: function () {
    return _http.SessionStorageFactory;
  }
});
Object.defineProperty(exports, "IScopedRenderingClient", {
  enumerable: true,
  get: function () {
    return _rendering.IScopedRenderingClient;
  }
});
Object.defineProperty(exports, "RenderingServiceSetup", {
  enumerable: true,
  get: function () {
    return _rendering.RenderingServiceSetup;
  }
});
Object.defineProperty(exports, "IRenderOptions", {
  enumerable: true,
  get: function () {
    return _rendering.IRenderOptions;
  }
});
Object.defineProperty(exports, "PluginsServiceSetup", {
  enumerable: true,
  get: function () {
    return _plugins.PluginsServiceSetup;
  }
});
Object.defineProperty(exports, "PluginsServiceStart", {
  enumerable: true,
  get: function () {
    return _plugins.PluginsServiceStart;
  }
});
Object.defineProperty(exports, "PluginOpaqueId", {
  enumerable: true,
  get: function () {
    return _plugins.PluginOpaqueId;
  }
});
Object.defineProperty(exports, "DiscoveredPlugin", {
  enumerable: true,
  get: function () {
    return _plugins.DiscoveredPlugin;
  }
});
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function () {
    return _plugins.Plugin;
  }
});
Object.defineProperty(exports, "PluginConfigDescriptor", {
  enumerable: true,
  get: function () {
    return _plugins.PluginConfigDescriptor;
  }
});
Object.defineProperty(exports, "PluginConfigSchema", {
  enumerable: true,
  get: function () {
    return _plugins.PluginConfigSchema;
  }
});
Object.defineProperty(exports, "PluginInitializer", {
  enumerable: true,
  get: function () {
    return _plugins.PluginInitializer;
  }
});
Object.defineProperty(exports, "PluginInitializerContext", {
  enumerable: true,
  get: function () {
    return _plugins.PluginInitializerContext;
  }
});
Object.defineProperty(exports, "PluginManifest", {
  enumerable: true,
  get: function () {
    return _plugins.PluginManifest;
  }
});
Object.defineProperty(exports, "PluginName", {
  enumerable: true,
  get: function () {
    return _plugins.PluginName;
  }
});
Object.defineProperty(exports, "SharedGlobalConfig", {
  enumerable: true,
  get: function () {
    return _plugins.SharedGlobalConfig;
  }
});
Object.defineProperty(exports, "ContextSetup", {
  enumerable: true,
  get: function () {
    return _context.ContextSetup;
  }
});
Object.defineProperty(exports, "IContextContainer", {
  enumerable: true,
  get: function () {
    return _context.IContextContainer;
  }
});
Object.defineProperty(exports, "IContextProvider", {
  enumerable: true,
  get: function () {
    return _context.IContextProvider;
  }
});
Object.defineProperty(exports, "HandlerFunction", {
  enumerable: true,
  get: function () {
    return _context.HandlerFunction;
  }
});
Object.defineProperty(exports, "HandlerContextType", {
  enumerable: true,
  get: function () {
    return _context.HandlerContextType;
  }
});
Object.defineProperty(exports, "HandlerParameters", {
  enumerable: true,
  get: function () {
    return _context.HandlerParameters;
  }
});
Object.defineProperty(exports, "IUiSettingsClient", {
  enumerable: true,
  get: function () {
    return _ui_settings.IUiSettingsClient;
  }
});
Object.defineProperty(exports, "UiSettingsParams", {
  enumerable: true,
  get: function () {
    return _ui_settings.UiSettingsParams;
  }
});
Object.defineProperty(exports, "UiSettingsType", {
  enumerable: true,
  get: function () {
    return _ui_settings.UiSettingsType;
  }
});
Object.defineProperty(exports, "UiSettingsServiceSetup", {
  enumerable: true,
  get: function () {
    return _ui_settings.UiSettingsServiceSetup;
  }
});
Object.defineProperty(exports, "UiSettingsServiceStart", {
  enumerable: true,
  get: function () {
    return _ui_settings.UiSettingsServiceStart;
  }
});
Object.defineProperty(exports, "UserProvidedValues", {
  enumerable: true,
  get: function () {
    return _ui_settings.UserProvidedValues;
  }
});
Object.defineProperty(exports, "SavedObjectsBulkCreateObject", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsBulkCreateObject;
  }
});
Object.defineProperty(exports, "SavedObjectsBulkGetObject", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsBulkGetObject;
  }
});
Object.defineProperty(exports, "SavedObjectsBulkUpdateObject", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsBulkUpdateObject;
  }
});
Object.defineProperty(exports, "SavedObjectsBulkUpdateOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsBulkUpdateOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsBulkResponse", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsBulkResponse;
  }
});
Object.defineProperty(exports, "SavedObjectsBulkUpdateResponse", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsBulkUpdateResponse;
  }
});
Object.defineProperty(exports, "SavedObjectsClient", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsClient;
  }
});
Object.defineProperty(exports, "SavedObjectsClientProviderOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsClientProviderOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsClientWrapperFactory", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsClientWrapperFactory;
  }
});
Object.defineProperty(exports, "SavedObjectsClientWrapperOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsClientWrapperOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsClientFactory", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsClientFactory;
  }
});
Object.defineProperty(exports, "SavedObjectsCreateOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsCreateOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsErrorHelpers", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsErrorHelpers;
  }
});
Object.defineProperty(exports, "SavedObjectsExportOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsExportOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsExportResultDetails", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsExportResultDetails;
  }
});
Object.defineProperty(exports, "SavedObjectsFindResponse", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsFindResponse;
  }
});
Object.defineProperty(exports, "SavedObjectsImportConflictError", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportConflictError;
  }
});
Object.defineProperty(exports, "SavedObjectsImportError", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportError;
  }
});
Object.defineProperty(exports, "SavedObjectsImportMissingReferencesError", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportMissingReferencesError;
  }
});
Object.defineProperty(exports, "SavedObjectsImportOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsImportResponse", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportResponse;
  }
});
Object.defineProperty(exports, "SavedObjectsImportRetry", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportRetry;
  }
});
Object.defineProperty(exports, "SavedObjectsImportUnknownError", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportUnknownError;
  }
});
Object.defineProperty(exports, "SavedObjectsImportUnsupportedTypeError", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsImportUnsupportedTypeError;
  }
});
Object.defineProperty(exports, "SavedObjectsMigrationLogger", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsMigrationLogger;
  }
});
Object.defineProperty(exports, "SavedObjectsRawDoc", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsRawDoc;
  }
});
Object.defineProperty(exports, "SavedObjectsResolveImportErrorsOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsResolveImportErrorsOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsSchema", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsSchema;
  }
});
Object.defineProperty(exports, "SavedObjectsSerializer", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsSerializer;
  }
});
Object.defineProperty(exports, "SavedObjectsLegacyService", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsLegacyService;
  }
});
Object.defineProperty(exports, "SavedObjectsUpdateOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsUpdateOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsUpdateResponse", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsUpdateResponse;
  }
});
Object.defineProperty(exports, "SavedObjectsServiceStart", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsServiceStart;
  }
});
Object.defineProperty(exports, "SavedObjectsServiceSetup", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsServiceSetup;
  }
});
Object.defineProperty(exports, "SavedObjectsDeleteOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsDeleteOptions;
  }
});
Object.defineProperty(exports, "ISavedObjectsRepository", {
  enumerable: true,
  get: function () {
    return _saved_objects.ISavedObjectsRepository;
  }
});
Object.defineProperty(exports, "SavedObjectsRepository", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsRepository;
  }
});
Object.defineProperty(exports, "SavedObjectsDeleteByNamespaceOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsDeleteByNamespaceOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsIncrementCounterOptions", {
  enumerable: true,
  get: function () {
    return _saved_objects.SavedObjectsIncrementCounterOptions;
  }
});
Object.defineProperty(exports, "CapabilitiesSetup", {
  enumerable: true,
  get: function () {
    return _capabilities.CapabilitiesSetup;
  }
});
Object.defineProperty(exports, "CapabilitiesStart", {
  enumerable: true,
  get: function () {
    return _capabilities.CapabilitiesStart;
  }
});
Object.defineProperty(exports, "Capabilities", {
  enumerable: true,
  get: function () {
    return _capabilities.Capabilities;
  }
});
Object.defineProperty(exports, "CapabilitiesProvider", {
  enumerable: true,
  get: function () {
    return _capabilities.CapabilitiesProvider;
  }
});
Object.defineProperty(exports, "CapabilitiesSwitcher", {
  enumerable: true,
  get: function () {
    return _capabilities.CapabilitiesSwitcher;
  }
});
Object.defineProperty(exports, "UuidServiceSetup", {
  enumerable: true,
  get: function () {
    return _uuid.UuidServiceSetup;
  }
});
Object.defineProperty(exports, "bootstrap", {
  enumerable: true,
  get: function () {
    return _bootstrap.bootstrap;
  }
});
Object.defineProperty(exports, "ConfigPath", {
  enumerable: true,
  get: function () {
    return _config.ConfigPath;
  }
});
Object.defineProperty(exports, "ConfigService", {
  enumerable: true,
  get: function () {
    return _config.ConfigService;
  }
});
Object.defineProperty(exports, "ConfigDeprecation", {
  enumerable: true,
  get: function () {
    return _config.ConfigDeprecation;
  }
});
Object.defineProperty(exports, "ConfigDeprecationProvider", {
  enumerable: true,
  get: function () {
    return _config.ConfigDeprecationProvider;
  }
});
Object.defineProperty(exports, "ConfigDeprecationLogger", {
  enumerable: true,
  get: function () {
    return _config.ConfigDeprecationLogger;
  }
});
Object.defineProperty(exports, "ConfigDeprecationFactory", {
  enumerable: true,
  get: function () {
    return _config.ConfigDeprecationFactory;
  }
});
Object.defineProperty(exports, "EnvironmentMode", {
  enumerable: true,
  get: function () {
    return _config.EnvironmentMode;
  }
});
Object.defineProperty(exports, "PackageInfo", {
  enumerable: true,
  get: function () {
    return _config.PackageInfo;
  }
});
Object.defineProperty(exports, "CoreId", {
  enumerable: true,
  get: function () {
    return _core_context.CoreId;
  }
});
Object.defineProperty(exports, "CspConfig", {
  enumerable: true,
  get: function () {
    return _csp.CspConfig;
  }
});
Object.defineProperty(exports, "ICspConfig", {
  enumerable: true,
  get: function () {
    return _csp.ICspConfig;
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _logging.Logger;
  }
});
Object.defineProperty(exports, "LoggerFactory", {
  enumerable: true,
  get: function () {
    return _logging.LoggerFactory;
  }
});
Object.defineProperty(exports, "LogMeta", {
  enumerable: true,
  get: function () {
    return _logging.LogMeta;
  }
});
Object.defineProperty(exports, "LogRecord", {
  enumerable: true,
  get: function () {
    return _logging.LogRecord;
  }
});
Object.defineProperty(exports, "LogLevel", {
  enumerable: true,
  get: function () {
    return _logging.LogLevel;
  }
});
Object.defineProperty(exports, "RecursiveReadonly", {
  enumerable: true,
  get: function () {
    return _utils.RecursiveReadonly;
  }
});
Object.defineProperty(exports, "SavedObject", {
  enumerable: true,
  get: function () {
    return _types2.SavedObject;
  }
});
Object.defineProperty(exports, "SavedObjectAttribute", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectAttribute;
  }
});
Object.defineProperty(exports, "SavedObjectAttributes", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectAttributes;
  }
});
Object.defineProperty(exports, "SavedObjectAttributeSingle", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectAttributeSingle;
  }
});
Object.defineProperty(exports, "SavedObjectReference", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectReference;
  }
});
Object.defineProperty(exports, "SavedObjectsBaseOptions", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectsBaseOptions;
  }
});
Object.defineProperty(exports, "MutatingOperationRefreshSetting", {
  enumerable: true,
  get: function () {
    return _types2.MutatingOperationRefreshSetting;
  }
});
Object.defineProperty(exports, "SavedObjectsClientContract", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectsClientContract;
  }
});
Object.defineProperty(exports, "SavedObjectsFindOptions", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectsFindOptions;
  }
});
Object.defineProperty(exports, "SavedObjectsMigrationVersion", {
  enumerable: true,
  get: function () {
    return _types2.SavedObjectsMigrationVersion;
  }
});
Object.defineProperty(exports, "LegacyServiceSetupDeps", {
  enumerable: true,
  get: function () {
    return _legacy.LegacyServiceSetupDeps;
  }
});
Object.defineProperty(exports, "LegacyServiceStartDeps", {
  enumerable: true,
  get: function () {
    return _legacy.LegacyServiceStartDeps;
  }
});
Object.defineProperty(exports, "LegacyServiceDiscoverPlugins", {
  enumerable: true,
  get: function () {
    return _legacy.LegacyServiceDiscoverPlugins;
  }
});
Object.defineProperty(exports, "LegacyConfig", {
  enumerable: true,
  get: function () {
    return _legacy.LegacyConfig;
  }
});
Object.defineProperty(exports, "LegacyUiExports", {
  enumerable: true,
  get: function () {
    return _legacy.LegacyUiExports;
  }
});
Object.defineProperty(exports, "LegacyInternals", {
  enumerable: true,
  get: function () {
    return _legacy.LegacyInternals;
  }
});

var _elasticsearch = require("./elasticsearch");

var _http = require("./http");

var _rendering = require("./rendering");

var _plugins = require("./plugins");

var _context = require("./context");

var _ui_settings = require("./ui_settings");

var _types = require("./saved_objects/types");

var _saved_objects = require("./saved_objects");

var _capabilities = require("./capabilities");

var _uuid = require("./uuid");

var _bootstrap = require("./bootstrap");

var _config = require("./config");

var _core_context = require("./core_context");

var _csp = require("./csp");

var _api_types = require("./elasticsearch/api_types");

Object.keys(_api_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api_types[key];
    }
  });
});

var _logging = require("./logging");

var _utils = require("../utils");

var _types2 = require("./types");

var _legacy = require("./legacy");