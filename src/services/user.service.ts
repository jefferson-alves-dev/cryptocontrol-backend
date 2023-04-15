import bcrypt from 'bcrypt';
import userModel from '../models/user.models.js';

const getAll = async () => {
  return await userModel.getAll();
};

const getById = async (id: any) => {
  const userId = Number(id);
  return await userModel.getById(userId);
};

const getByEmail = async (email: string) => {
  return await userModel.getByEmail(email);
};

const create = async (body: any) => {
  const { name, email, password } = body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(
    password + process.env.PRIVATE_KEY_BCRYPT,
    salt
  );

  return await userModel.create(name, email, hash);
};

const deleteUser = async (id: any) => {
  return await userModel.deleteUser(Number(id));
};

export default { getById, getAll, create, deleteUser, getByEmail };
