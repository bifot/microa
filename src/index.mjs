import app from './core/app'
import * as models from './core/models'
import * as routes from './core/routes'

export const createApp = app
export const { createModels } = models
export const {
  createRoute,
  getRoutes,
  getKoaRoutes,
  getSocketRoutes,
} = routes

// TODO: createMiddleware(fn)
// TODO: createModels(field, Object<Models>)
