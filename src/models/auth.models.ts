import { database } from '../database/database.js';

const getByEmail = async (email: string) => {
  return await database.user.findFirst({
    where: {
      email: email,
    },
  });
};

export default { getByEmail };
