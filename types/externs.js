/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _goa = {}
/**
 * Options for the program.
 * @record
 */
_goa.CorsConfig
/**
 * `Access-Control-Allow-Origin` header, default is taken from the `Origin` request header.
 * @type {(string|function(!_goa.Context))|undefined}
 */
_goa.CorsConfig.prototype.origin
/**
 * `Access-Control-Allow-Methods` header. Default `GET,HEAD,PUT,POST,DELETE,PATCH`.
 * @type {(string|!Array<string>)|undefined}
 */
_goa.CorsConfig.prototype.allowMethods
/**
 * `Access-Control-Expose-Headers` header.
 * @type {(string|!Array<string>)|undefined}
 */
_goa.CorsConfig.prototype.exposeHeaders
/**
 * `Access-Control-Allow-Headers` header.
 * @type {(string|!Array<string>)|undefined}
 */
_goa.CorsConfig.prototype.allowHeaders
/**
 * `Access-Control-Max-Age` header in seconds.
 * @type {(string|number)|undefined}
 */
_goa.CorsConfig.prototype.maxAge
/**
 * `Access-Control-Max-Age` header in seconds. Default `false`.
 * @type {boolean|undefined}
 */
_goa.CorsConfig.prototype.credentials
/**
 * Add set headers to `err.header` if an error is thrown. Default `true`.
 * @type {boolean|undefined}
 */
_goa.CorsConfig.prototype.keepHeadersOnError

/* typal types/api.xml externs */
/**
 * Cross-Origin Resource Sharing (CORS) For Goa.
 * @typedef {function(!_goa.CorsConfig=): !_goa.Middleware}
 */
_goa.cors
