const modelsPool = {}

export const createModels = (key, Model) => {
  modelsPool[key] = Model
}

export const getModels = ctx => Object.entries(modelsPool).reduce((object, [key, Model]) => ({
  ...object,
  [key]: new Model(ctx),
}), {})
