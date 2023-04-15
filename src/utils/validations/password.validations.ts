import bcrypt from 'bcrypt';

const comparePassword = async (
  passwordBody: string,
  passwordDataBase: string
) => {
  return await bcrypt.compare(
    passwordBody + process.env.PRIVATE_KEY_BCRYPT,
    passwordDataBase
  );
};

export default { comparePassword };
