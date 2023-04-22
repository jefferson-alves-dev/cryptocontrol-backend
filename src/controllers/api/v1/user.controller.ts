import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
// import userService from '../../../services/user.service.js';
import bcrypt from 'bcrypt';
import userModels from '../../../models/user.models.js';
import jwtHandler from '../../../utils/validations/jtw.validations.js';

const getAll = async (req: Request, res: Response) => {
  const user = await userModels.getAll();
  return res.status(200).json({ ...user });
};

const getById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }
  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const user = await userModels.getById(Number(userId));
  return res.status(200).json({ ...user });
};

const create = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }

  const { name, email, password } = req.body;
  const userExists = await userModels.getByEmail(email);

  if (userExists) {
    return res.status(409).json({
      message: `The email '${req.body.email}' already exists. Try another.'`,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(
    password + process.env.PRIVATE_KEY_BCRYPT,
    salt
  );

  await userModels.create(name, email, hash);
  return res.status(201).json({ user: { name, email } });
};

const deleteUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors });
  }

  const { userId }: any = await jwtHandler.decodeToken(res.locals.accessToken);
  const userExists = await userModels.getById(Number(userId));
  if (!userExists) {
    return res.status(409).json({ message: 'This ID was not found.' });
  }

  const { name, login } = userExists;
  await userModels.deleteUser(Number(userId));
  return res.status(200).json({
    message: 'User deleted successfully.',
    user: {
      name,
      login,
    },
  });
};

export default { getById, getAll, create, deleteUser };
