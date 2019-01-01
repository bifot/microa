[![microa](https://img.shields.io/npm/v/microa.svg?style=flat-square)](https://www.npmjs.com/package/microa)
![microa](https://img.shields.io/travis/com/bifot/microa.svg?style=flat-square)
![microa](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)

# microa

Framework for easily building responsive microservices. 🔬

## Introduction

Framework works only with Node >= 8.5 and flag `--experimental-modules`.

## Install

```sh
$ npm i microa -S
```

## Tests

```sh
$ npm test
```

## Usage

Microservice natively can accept requests via http & sockets.

**Backend:**

```js
import { createApp, createRoute } from 'microa';

createRoute('/users', {
  '/create': (ctx) => {
    // Backend magic... 🧙
    ctx.body = { id: 1 };
  },
});

createApp({
  port: 3000,
  debug: true,
});
```

**Frontend:**

```js
// Create connect to the microservice
const socket = io('http://localhost:3000');

// Send an event via promisified emit method
const response = await socket.emitAsync('users:create', {
  fistName: 'Mikhail',
  lastName: 'Semin',
});
```

```js
// Send an event via axios
const { data } = await axios.post('http://localhost:3000/users/create', {
  fistName: 'Mikhail',
  lastName: 'Semin',
});
```

## Methods

Import all needed methods.

```js
import { createModels, createRoute, createApp } from 'microa';
```

### .createModels(models)

Create models for context. Every class constuctor accepts one argument `ctx`.

```js
createModels({
  user: class User {},
  balance: class Balance {},
});
```

After initializing models, instances will passed in `ctx.models`.

```js
createRoute('/users', {
  '/me': (ctx) => {
    // ctx.models.user
    // ctx.models.balance
  },
});
```

### .createRoute(prefix, routes)

Create routes. Paths will transform for `socket.io` & `http` automatically. Be careful, `http` requests work only via `POST` method.

* `socket.io` ⇒ `books:get-all`
* `http` ⇒ `/books/get/all`

```js
createRoute('/books', {
  '/get/all': (ctx) => {
    // ...
  },
});
```

### .createApp(options)

Start listening app.

```js
createApp({
  port: 8080,
  debug: true,
});
```

## License

MIT.
