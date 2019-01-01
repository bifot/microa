import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compose from 'koa-compose';
import http from 'http';
import socket from 'socket.io';
import * as Routes from './routes';
import { composeParams, assignModels } from '../middlewares';

export default ({ name = 'Microservice', port = 8080, debug }) => {
  const app = new Koa();
  const koaRoutes = Routes.getKoaRoutes(debug);

  app.use(bodyParser());
  app.use(composeParams);
  app.use(assignModels);
  app.use(compose(koaRoutes));

  const server = http.createServer(app.callback());
  const io = socket(server);

  io.on('connection', (client) => {
    Routes.getSocketRoutes(client);
  });

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`${name} starts listen on ${port} port.`);
  });
};
