const addSign = (n: number): string => {
  return (n < 0 ? "" : "+") + n;
};

export default addSign;
