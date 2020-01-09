import Http from '@contexts/http'
import Goa from '@goa/koa'

/**
 * A testing context for the package.
 */
export default class Context extends Http {
  get app() {
    if (this._app) return this._app
    this._app = new Goa()
    return this._app
  }
  get origin() {
    return 'https://idio.cc'
  }
}

/** @typedef {Object<string, Test & TestSuite4>} TestSuite */
/** @typedef {Object<string, Test & TestSuite3>} TestSuite4 */
/** @typedef {Object<string, Test & TestSuite2>} TestSuite3 */
/** @typedef {Object<string, Test & TestSuite1>} TestSuite2 */
/** @typedef {Object<string, Test & TestSuite0>} TestSuite1 */
/** @typedef {Object<string, Test>} TestSuite0 */
/** @typedef {(c: Context)} Test */