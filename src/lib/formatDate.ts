const formatDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  return `${year}-${
    String(month).length === 1 ? `0${month}` : month
  }-${day} ${hour}:${String(minute).length === 1 ? `0${minute}` : minute}`;
};

export default formatDate;
