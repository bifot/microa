export default async (ctx, next) => {
  ctx.params = {
    ...ctx.params,
    ...ctx.request.query,
    ...ctx.request.body,
  };

  await next();
};
