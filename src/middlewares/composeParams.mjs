export default (ctx, next) => {
  ctx.params = {
    ...ctx.params,
    ...ctx.request.query,
    ...ctx.request.body,
  }

  return next()
}
