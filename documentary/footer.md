<!-- ## TODO

- [ ] Add a new item to the todo list. -->

## Usage Events

This middleware integrates with [_Idio_](https://github.com/idiocc/idio) that collects middleware usage statistics to reward package maintainers. It will emit certain events to bill its usage:

1. `headers`: When setting the headers if origin was present.
1. `options`: When responding to pre-flight requests via the `OPTIONS` http method.

The usage is recorded via the `ctx.neoluddite` context property set by a server such as _Idio_. In future, more fine-grained usage events might appear.

%~%

## Copyright & License

GNU Affero General Public License v3.0

Affero GPL means that you're not allowed to use this middleware on the web unless you release the source code for your application. This is a restrictive license which has the purpose of defending Open Source work and its creators.

Please refer to the [Idio license agreement](https://github.com/idiocc/idio#copyright--license) for more info on dual-licensing. You're allowed to use this middleware without disclosing the source code if you sign up on [neoluddite.dev](https://neoluddite.dev) package reward scheme.

Original Work by [dead-horse & contributors](https://github.com/koajs/cors) licensed under MIT found in [COPYING](COPYING).

<footer />

%~ -1%