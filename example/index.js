import Goa from '@goa/koa'
import { aqt } from 'rqt'
import cors from '../src'

const goa = new Goa()
goa.use(cors())

goa.listen(async function() {
  const { port } = this.address()
  const url = `http://localhost:${port}`

  // 1. accept origin from the host
  const { headers } = await aqt(url, {
    headers: {
      origin: 'www.example.com',
    },
  })
  console.log(headers)
  this.close()
})