const getErrorText = (payload: any) => {
  const { code, actor } = payload;
  switch (code) {
    case 1002:
      return `${actor || "Entity"} Is Existed`;
    case 1004:
      return `${actor || "Entity"} Not Found`;
    default:
      return `Undetermined`;
  }
};

export { getErrorText };
