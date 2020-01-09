import { equal } from '@zoroaster/assert'
import Context from '../context'
import cors from '../../src'

/** @type {TestSuite} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof cors, 'function')
  },
  async'returns Access-Control-Allow-Methods headers'({ startPlain, app, origin }) {
    app.use(cors({
      allowMethods: ['GET', 'POST'],
    }))
    await startPlain(app.callback())
      .set('Origin', origin)
      .set('Access-Control-Request-Method', 'GET')
      .options('/')
      .assert('access-control-allow-methods', 'GET,POST')
  },
  async'returns CORS headers with a function'({ startPlain, app, origin }) {
    app.use(cors({
      origin() {
        return origin
      },
    }))
    await startPlain(app.callback())
      .set('Origin', origin)
      .get('/')
      .assert('access-control-allow-origin', origin)
  },
  async'returns CORS headers with a string'({ startPlain, app, origin }) {
    app.use(cors({
      origin,
    }))
    await startPlain(app.callback())
      .set('Origin', origin)
      .get('/')
      .assert('access-control-allow-origin', origin)
  },
}

/** @type {TestSuite} */
export const usage = {
  context: Context,
  async'records options'({ startPlain, app, origin }) {
    app.use(async (ctx, next) => {
      ctx.neoluddite = (p, item) => {
        usage.push({ package: p, item })
      }
      await next()
    })
    app.use(cors())
    let usage = []
    await startPlain(app.callback())
      .set('Origin', origin)
      .set('Access-Control-Request-Method', 'GET')
      .options('/')
    return usage
  },
  async'records headers'({ startPlain, app, origin }) {
    app.use(async (ctx, next) => {
      ctx.neoluddite = (p, item) => {
        usage.push({ package: p, item })
      }
      await next()
    })
    app.use(cors())
    let usage = []
    await startPlain(app.callback())
      .set('Origin', origin)
      .get('/')
    return usage
  },
}

/**
 * @typedef {import('../context').TestSuite} TestSuite
 */

export default T