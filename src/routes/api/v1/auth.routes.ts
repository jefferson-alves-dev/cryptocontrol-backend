import { Router } from 'express';
import authController from '../../../controllers/api/v1/auth.controller.js';

const routersAuth = Router();

routersAuth.post('/login', authController.login);
routersAuth.post('/logout', authController.logout);
routersAuth.post('/refreshToken', authController.refreshToken);
routersAuth.post('/checkToken', authController.checkToken);

export default routersAuth;
