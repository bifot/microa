import * as models from '../core/models';

export default async (ctx, next) => {
  ctx.models = models.getModels(ctx);

  await next();
};
