const { _cors } = require('./cors')

/**
 * Cross-Origin Resource Sharing (CORS) For Goa.
 * @param {!_cors.Config} config Options for the program.
 * @param {boolean} [config.shouldRun=true] A boolean option. Default `true`.
 * @param {string} [config.text] A text to return.
 * @return {Promise<string>}
 */
function myNewPackge(config) {
  return _cors(config)
}

module.exports = myNewPackge

/* typal types/index.xml namespace */
/**
 * @typedef {_cors.Config} Config `＠record` Options for the program.
 * @typedef {Object} _cors.Config `＠record` Options for the program.
 * @prop {boolean} [shouldRun=true] A boolean option. Default `true`.
 * @prop {string} [text] A text to return.
 */
