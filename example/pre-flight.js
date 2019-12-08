import Goa from '@goa/koa'
import { aqt } from 'rqt'
import cors from '../src'

const goa = new Goa()
goa.use(cors({
  origin: 'www.hello-world.com',
  credentials: true,
  maxAge: 1000,
  allowMethods: ['POST', 'PUT'],
}))

goa.listen(async function() {
  const { port } = this.address()
  const url = `http://localhost:${port}`

  // 3. respond to pre-flight request
  const { statusCode, headers } = await aqt(url, {
    method: 'OPTIONS',
    headers: {
      'Access-Control-Request-Method': 'POST',
      origin: 'www.example.com',
    },
  })
  console.log(statusCode, headers)
  this.close()
})