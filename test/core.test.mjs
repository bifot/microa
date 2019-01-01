import chai from 'chai';
import { client } from './config';
import { createModels, createRoute } from '../src/exports';
import { getModels } from '../src/core/models';
import { getRoutes, getKoaRoutes, getSocketRoutes } from '../src/core/routes';

const { expect } = chai;

describe('core', () => {
  it('create models', () => {
    createModels({
      user: class User {
        constructor(ctx) {
          this.id = ctx.params.id;
        }
      },
    });

    const models = getModels({
      params: {
        id: 1,
      },
    });

    expect(models).to.be.a('object').to.have.all.keys(['user']);
    expect(models.user).to.be.a('object');
    expect(models.user.id).to.equal(1);
  });

  it('create route', () => {
    createRoute('/categories', {
      '/list': () => {},
    });

    const routes = getRoutes();
    const [koaRoutes] = getKoaRoutes();
    const [socketRoutes] = getSocketRoutes(client);

    const {
      opts: {
        prefix,
      },
      methods,
      stack,
      path,
    } = koaRoutes.router.stack[0];

    // Routes pool
    expect(routes['/categories']).to.be.a('object').to.have.all.keys(['/list']);
    expect(routes['/categories']['/list']).to.be.a('array').to.have.length(1);
    expect(routes['/categories']['/list'][0]).to.be.a('function');

    // Koa route
    expect(prefix).to.be.equal('/categories');
    expect(methods).to.deep.equal(['POST']);
    expect(stack).to.be.a('array').to.have.length(1);
    expect(stack[0]).to.be.a('function');
    expect(path).to.be.equal('/categories/list');

    // Socket route
    expect(socketRoutes.events).to.be.a('object').to.have.all.keys(['categories:list']);
    expect(socketRoutes.events['categories:list']).to.be.a('function');
  });
});
