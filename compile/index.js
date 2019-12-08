const { _cors } = require('./cors')

/**
 * Cross-Origin Resource Sharing (CORS) For Goa.
 * @param {!_goa.CorsConfig} [config] Options for the program.
 * @param {string|function(!_goa.Context)} [config.origin] `Access-Control-Allow-Origin` header, default is taken from the `Origin` request header.
 * @param {string|!Array<string>} [config.allowMethods="GET,HEAD,PUT,POST,DELETE,PATCH"] `Access-Control-Allow-Methods` header. Default `GET,HEAD,PUT,POST,DELETE,PATCH`.
 * @param {string|!Array<string>} [config.exposeHeaders] `Access-Control-Expose-Headers` header.
 * @param {string|!Array<string>} [config.allowHeaders] `Access-Control-Allow-Headers` header.
 * @param {string|number} [config.maxAge] `Access-Control-Max-Age` header in seconds.
 * @param {boolean} [config.credentials=false] `Access-Control-Max-Age` header in seconds. Default `false`.
 * @param {boolean} [config.keepHeadersOnError=true] Add set headers to `err.header` if an error is thrown. Default `true`.
 * @return {string}
 */
function cors(config) {
  return _cors(config)
}

module.exports = cors

/* typal types/index.xml namespace */
/**
 * @typedef {_goa.CorsConfig} CorsConfig `＠record` Options for the program.
 * @typedef {Object} _goa.CorsConfig `＠record` Options for the program.
 * @prop {string|function(!_goa.Context)} [origin] `Access-Control-Allow-Origin` header, default is taken from the `Origin` request header.
 * @prop {string|!Array<string>} [allowMethods="GET,HEAD,PUT,POST,DELETE,PATCH"] `Access-Control-Allow-Methods` header. Default `GET,HEAD,PUT,POST,DELETE,PATCH`.
 * @prop {string|!Array<string>} [exposeHeaders] `Access-Control-Expose-Headers` header.
 * @prop {string|!Array<string>} [allowHeaders] `Access-Control-Allow-Headers` header.
 * @prop {string|number} [maxAge] `Access-Control-Max-Age` header in seconds.
 * @prop {boolean} [credentials=false] `Access-Control-Max-Age` header in seconds. Default `false`.
 * @prop {boolean} [keepHeadersOnError=true] Add set headers to `err.header` if an error is thrown. Default `true`.
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Context} _goa.Context
 */