import Router from 'koa-router';
import * as Models from './models';

const routesPool = {};

export const createRoute = (prefix, routes) => {
  routesPool[prefix] = Object.entries(routes).reduce((object, [endpoint, middlewares]) => ({
    ...object,
    [endpoint]: Array.isArray(middlewares) ? middlewares : [middlewares],
  }), {});
};

export const getRoutes = () => routesPool;

export const getKoaRoutes = debug => Object.entries(routesPool).map(([prefix, routes]) => {
  const router = new Router({ prefix });

  Object.entries(routes).forEach(([endpoint, middlewares]) => {
    if (debug) {
      router.get(endpoint, ...middlewares);
    }

    router.post(endpoint, ...middlewares);
  });

  return router.routes();
});

export const getSocketRoutes = client => Object.entries(routesPool).map(([prefix, routes]) => {
  const formattedPrefix = prefix.startsWith('/') ? prefix.slice(1) : prefix;

  Object.entries(routes).forEach(([endpoint, [middleware]]) => {
    const formattedEndpoint = (endpoint.startsWith('/') ? endpoint.slice(1) : endpoint).replace(/\//g, '-');
    const event = `${formattedPrefix}:${formattedEndpoint}`;

    client.on(event, (data, callback = () => {}) => {
      const ctx = Object.defineProperties({
        client,
        params: data,
        models: Models.getModels({
          ...client,
          params: data,
        }),
      }, {
        body: {
          set: body => callback(body),
        },
      });

      middleware(ctx);
    });
  });

  return client;
});
