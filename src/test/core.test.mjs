import 'mjs-mocha'
import chai from 'chai'
import { client } from './config.test.mjs'
import {
  createRoute,
  getRoutes,
  getKoaRoutes,
  getSocketRoutes,
} from '..'

const { expect } = chai

describe('core', () => {
  it('create route', () => {
    createRoute('/categories', {
      '/list': () => {},
    })

    const routes = getRoutes()
    const [koaRoutes] = getKoaRoutes()
    const [socketRoutes] = getSocketRoutes(client)

    const {
      opts: {
        prefix,
      },
      methods,
      stack,
      path,
    } = koaRoutes.router.stack[0]

    // Routes pool
    expect(routes['/categories']).to.be.a('object').to.have.all.keys(['/list'])
    expect(routes['/categories']['/list']).to.be.a('array').to.have.length(1)
    expect(routes['/categories']['/list'][0]).to.be.a('function')

    // Koa route
    expect(prefix).to.be.equal('/categories')
    expect(methods).to.deep.equal(['POST'])
    expect(stack).to.be.a('array').to.have.length(1)
    expect(stack[0]).to.be.a('function')
    expect(path).to.be.equal('/categories/list')

    // Socket route
    expect(socketRoutes.events).to.be.a('object').to.have.all.keys(['categories:list'])
    expect(socketRoutes.events['categories:list']).to.be.a('function')
  })
})
