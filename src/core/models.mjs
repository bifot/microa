const modelsPool = {};

export const createModels = models => Object.entries(models).forEach(([key, Model]) => {
  modelsPool[key] = Model;
});

export const getModels = ctx => Object.entries(modelsPool).reduce((object, [key, Model]) => ({
  ...object,
  [key]: new Model(ctx),
}), {});
