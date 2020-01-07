export const getPrecisionFromMaxSupply = data => {
  const snumber = `${data}`.split(' ')[0];
  const dotIndex = snumber.indexOf('.');

  return dotIndex === -1 ? 0 : snumber.substring(dotIndex + 1).length;
};
