import { Router } from 'express';
import userController from '../../../controllers/api/v1/user.controller.js';
import userValidation from '../../../utils/validations/createUser.validations.js';
import authHandler from '../../../middlewares/tokenChecker.middleware.js';

const routersUser = Router();

routersUser.post('/create', userValidation.createUser, userController.create);
routersUser.get('/', authHandler.tokenChecker, userController.getById);
routersUser.delete('/', authHandler.tokenChecker, userController.deleteUser);

export default routersUser;
