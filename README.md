# @goa/cors

[![npm version](https://badge.fury.io/js/%40goa%2Fcors.svg)](https://www.npmjs.com/package/@goa/cors)

`@goa/cors` is Cross-Origin Resource Sharing ([CORS](https://developer.mozilla.org/en/docs/Web/HTTP/Access_control_CORS)) For Goa.

```sh
yarn add @goa/cors
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`cors(config=: !CorsConfig): !Middleware`](#corsconfig-corsconfig-middleware)
  * [`CorsConfig`](#type-corsconfig)
- [Usage Events](#usage-events)
- [Copyright & License](#copyright--license)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>


## API

The package is available by importing its default function:

```js
import cors from '@goa/cors'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>cors</ins>(</code><sub><br/>&nbsp;&nbsp;`config=: !CorsConfig,`<br/></sub><code>): <i>!Middleware</i></code>
Cross-Origin Resource Sharing (CORS) For Goa.

 - <kbd>config</kbd> <em><code><a href="#type-corsconfig" title="Options for the program.">!CorsConfig</a></code></em> (optional): The config.

__<a name="type-corsconfig">`CorsConfig`</a>__: Options for the program.
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
  <th>Default</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center">origin</td>
  <td><em>(string | function(<a href="https://github.com/idiocc/goa/wiki/Context#type-context" title="The context object for each request.">!Context</a>))</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>Access-Control-Allow-Origin</code> header, default is taken from the <code>Origin</code> request header.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">allowMethods</td>
  <td><em>(string | !Array&lt;string&gt;)</em></td>
  <td rowSpan="3"><code>GET,HEAD,PUT,POST,DELETE,PATCH</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>Access-Control-Allow-Methods</code> header.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">exposeHeaders</td>
  <td><em>(string | !Array&lt;string&gt;)</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>Access-Control-Expose-Headers</code> header.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">allowHeaders</td>
  <td><em>(string | !Array&lt;string&gt;)</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>Access-Control-Allow-Headers</code> header.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">maxAge</td>
  <td><em>(string | number)</em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>Access-Control-Max-Age</code> header in seconds.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">credentials</td>
  <td><em>boolean</em></td>
  <td rowSpan="3"><code>false</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   <code>Access-Control-Max-Age</code> header in seconds.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">keepHeadersOnError</td>
  <td><em>boolean</em></td>
  <td rowSpan="3"><code>true</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Add set headers to <code>err.header</code> if an error is thrown.
  </td>
 </tr>
</table>

There are 3 main use cases:

**1. Accept any origin form the client**

```js
import Goa from '@goa/koa'
import { aqt } from 'rqt'
import cors from '@goa/cors'

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
```
```js
{ vary: 'Origin',
  'access-control-allow-origin': 'www.example.com',
  'content-type': 'text/plain; charset=utf-8',
  'content-length': '9',
  date: 'Thu, 09 Jan 2020 02:16:29 GMT',
  connection: 'close' }
```

**2. Send out only specific origin**

```js
import Goa from '@goa/koa'
import { aqt } from 'rqt'
import cors from '@goa/cors'

const goa = new Goa()
goa.use(cors({
  origin: 'www.hello-world.com',
}))

goa.listen(async function() {
  const { port } = this.address()
  const url = `http://localhost:${port}`

  // 2. only serve specific origin
  const { headers } = await aqt(url, {
    headers: {
      origin: 'www.example.com',
    },
  })
  console.log(headers)
  this.close()
})
```
```js
{ vary: 'Origin',
  'access-control-allow-origin': 'www.hello-world.com',
  'content-type': 'text/plain; charset=utf-8',
  'content-length': '9',
  date: 'Thu, 09 Jan 2020 02:16:29 GMT',
  connection: 'close' }
```

**3. Pre-flight Requests Via OPTIONS (both above apply)**

```js
import Goa from '@goa/koa'
import { aqt } from 'rqt'
import cors from '@goa/cors'

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
```
```js
204 { vary: 'Origin',
  'access-control-allow-origin': 'www.hello-world.com',
  'access-control-allow-credentials': 'true',
  'access-control-max-age': '1000',
  'access-control-allow-methods': 'POST,PUT',
  date: 'Thu, 09 Jan 2020 02:16:29 GMT',
  connection: 'close' }
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Usage Events

This middleware integrates with Idio that collects middleware usage statistics to reward package maintainers. It will emit certain events to bill its usage:

1. `headers`: When setting the headers if origin was present.
1. `options`: When responding to pre-flight requests via the `OPTIONS` http method.

In future, more fine-grained usage events might appear.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## Copyright & License

GNU Affero General Public License v3.0

Affero GPL means that you're not allowed to use this middleware on the web unless you release the source code for your application. This is a restrictive license which has the purpose of defending Open Source work and its creators.

Please refer to the [Idio license agreement](https://github.com/idiocc/idio#copyright--license) for more info on dual-licensing. You're allowed to use this middleware without disclosing the source code if you sign up on [neoluddite.dev](https://neoluddite.dev) package reward scheme.

Original Work by [dead-horse & contributors](https://github.com/koajs/cors) licensed under MIT found in [COPYING](COPYING).

<table>
  <tr><td><img src="https://avatars3.githubusercontent.com/u/40834161?s=100" alt="idiocc"></td><td>© <a href="https://www.idio.cc">Idio</a> 2020</td></tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>