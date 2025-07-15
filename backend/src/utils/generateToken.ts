const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateToken = () => {
  const part1Length = 36;
  const part2Length = 45;
  const part3Length = 43;

  const part1 = generateRandomString(part1Length);
  const part2 = generateRandomString(part2Length);
  const part3 = generateRandomString(part3Length);

  return `${part1}.${part2}.${part3}`;
};
export { generateToken };
