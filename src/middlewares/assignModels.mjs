import * as Models from '../core/models'

export default (ctx, next) => {
  ctx.models = Models.getModels(ctx)

  return next()
}
