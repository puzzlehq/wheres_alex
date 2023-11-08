export const getNumberAmount = (amount: any) => {
  const numberAmount = Number(amount);
  return isNaN(numberAmount) ? 0 : numberAmount;
};
