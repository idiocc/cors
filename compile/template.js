const { _cors } = require('./cors')

/**
 * @methodType {_cors.cors}
 */
function myNewPackge(config) {
  return _cors(config)
}

module.exports = myNewPackge

/* typal types/index.xml namespace */
