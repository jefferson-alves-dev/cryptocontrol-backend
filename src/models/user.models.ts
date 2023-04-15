import { database } from '../database/database.js';

const getAll = async () => {
  return await database.user.findMany({
    select: {
      id: true,
      name: true,
      login: true,
    },
  });
};

const getById = async (userId: number) => {
  return await database.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      login: true,
    },
  });
};

const getByEmail = async (email: string) => {
  return await database.user.findUnique({
    where: {
      email: email,
    },
  });
};

const create = async (name: string, email: string, password: string) => {
  return await database.user.create({
    data: {
      name: name,
      login: email,
      email: email,
      password: password,
    },
  });
};

const deleteUser = async (userId: number) => {
  return await database.user.delete({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
    },
  });
};

export default { getById, getAll, create, getByEmail, deleteUser };
