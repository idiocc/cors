import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import cors from '../../src'

// export default
makeTestSuite('test/result/default', {
  async getResults() {
    const res = await cors({
      text: this.input,
    })
    return res
  },
  context: Context,
})