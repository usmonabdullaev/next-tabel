const uniqueId = (): string => {
  const _id: string =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  return _id;
};

export default uniqueId;
