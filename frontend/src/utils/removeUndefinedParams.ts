export const removeUndefinedParams = (params: any) => {
  const cleanParams = {} as any;

  Object.keys(params).forEach((key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== "undefined"
    ) {
      cleanParams[key] = params[key];
    }
  });

  return cleanParams;
};
