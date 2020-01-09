import { append } from '@goa/vary'

/**
 * @type {_goa.cors}
 */
function Cors(config = {}) {
  let {
    allowMethods = 'GET,HEAD,PUT,POST,DELETE,PATCH',
    exposeHeaders,
    allowHeaders,
    maxAge,
    credentials = false,
    keepHeadersOnError = true,
    origin: Origin,
  } = config

  if (Array.isArray(allowMethods))
    allowMethods = allowMethods.join(',')

  if (Array.isArray(exposeHeaders))
    exposeHeaders = exposeHeaders.join(',')

  if (Array.isArray(allowHeaders))
    allowHeaders = allowHeaders.join(',')

  if (maxAge) maxAge = `${maxAge}`

  /**
   * @type {!_goa.Middleware}
   */
  async function cors(ctx, next) {
    // If the Origin header is not present terminate this set of steps.
    // The request is outside the scope of this specification.
    const requestOrigin = ctx.get('Origin')

    // Always set Vary header
    // https://github.com/rs/cors/issues/10
    ctx.vary('Origin')

    if (!requestOrigin) return await next()

    let origin
    if (typeof Origin == 'function') {
      origin = Origin(ctx)
      if (origin instanceof Promise) origin = await origin
      if (!origin) return await next()
    } else {
      origin = Origin || requestOrigin
    }

    const headersSet = {}

    function set(key, value) {
      ctx.set(key, value)
      headersSet[key] = value
    }

    if (ctx.method != 'OPTIONS') {
      // Simple Cross-Origin Request, Actual Request, and Redirects
      set('Access-Control-Allow-Origin', origin)

      if (credentials)
        set('Access-Control-Allow-Credentials', 'true')

      if (exposeHeaders)
        set('Access-Control-Expose-Headers', exposeHeaders)

      if (ctx['neoluddite']) ctx['neoluddite']('@goa/cors', 'headers')

      if (!keepHeadersOnError) {
        return await next()
      }
      try {
        return await next()
      } catch (err) {
        const errHeadersSet = err['headers'] || {}
        const varyWithOrigin = append(errHeadersSet['vary'] || errHeadersSet['Vary'] || '', 'Origin')
        delete errHeadersSet.Vary

        err['headers'] = Object.assign({}, errHeadersSet, headersSet, { 'vary': varyWithOrigin })

        throw err
      }
    } else {
      // Preflight Request

      // If there is no Access-Control-Request-Method header or if parsing failed,
      // do not set any additional headers and terminate this set of steps.
      // The request is outside the scope of this specification.
      if (!ctx.get('Access-Control-Request-Method')) {
        // this not preflight request, ignore it
        return await next()
      }
      if (ctx['neoluddite']) ctx['neoluddite']('@goa/cors', 'options')

      ctx.set('Access-Control-Allow-Origin', origin)

      if (credentials)
        ctx.set('Access-Control-Allow-Credentials', 'true')

      if (maxAge)
        ctx.set('Access-Control-Max-Age', maxAge)

      if (allowMethods)
        ctx.set('Access-Control-Allow-Methods', allowMethods)

      if (!allowHeaders)
        allowHeaders = ctx.get('Access-Control-Request-Headers')

      if (allowHeaders) {
        ctx.set('Access-Control-Allow-Headers', allowHeaders)
      }

      ctx.status = 204
    }
  }
  return cors
}

export default Cors

/**
 * @typedef {import('../').CorsConfig} _goa.CorsConfig
 */
/**
 * @typedef {import('../').cors} _goa.cors
 */
/**
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 */