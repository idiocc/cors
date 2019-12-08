import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import cors from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof cors, 'function')
  },
  async 'calls package without error'() {
    await cors()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await cors({
      text,
    })
    ok(res, text)
  },
}

export default T