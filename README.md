[![microa](https://img.shields.io/npm/v/microa.svg?style=flat-square)](https://www.npmjs.com/package/microa)
![microa](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)

# microa

Framework for easily building responsive microservices. 🔬

## Install

```sh
$ npm i microa -S
```

## Tests

Tests in WIP.

## Usage

Microservice natively can accept requests via http & sockets.

**Backend:**

```js
import { createApp, createRoute } from 'microa'

createRoute('/users', {
  '/create': async (ctx) => {
    // Backend magic... 🧙
    ctx.body = { id: 1 }
  },
})

createApp({
  name: 'Powerful microservice',
  port: 3000,
})
```

**Frontend:**

```js
// Create connect to the microservice
const socket = io('http://localhost:3000')

// Send an event via promisified emit method
const response = await socket.emitAsync('users:create', {
  fistName: 'Mikhail',
  lastName: 'Semin',
})
```

```js
// Send an event via axios
const { data } = await axios.post('http://localhost:3000/users/create', {
  fistName: 'Mikhail',
  lastName: 'Semin',
})
```

## License

MIT.