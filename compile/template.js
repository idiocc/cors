const { _cors } = require('./cors')

/**
 * @methodType {_goa.cors}
 */
function $cors(config) {
  return _cors(config)
}

module.exports = $cors

/* typal types/index.xml namespace */

/* typal types/api.xml namespace */
