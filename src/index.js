import { c } from 'erte'

/**
 * Cross-Origin Resource Sharing (CORS) For Goa.
 * @param {!_cors.Config} [config] Options for the program.
 * @param {boolean} [config.shouldRun=true] A boolean option. Default `true`.
 * @param {string} [config.text] A text to return.
 */
export default async function cors(config = {}) {
  const {
    shouldRun = true,
    text = '',
  } = config
  if (!shouldRun) return
  console.log('@goa/cors called with %s', c(text, 'yellow'))
  return text
}

/**
 * @typedef {import('..').Config} _cors.Config
 */
