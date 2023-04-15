import { Router } from 'express';
import withdrawalController from '../../../controllers/api/v1/withdrawal.controller.js';
import withdrawalValidation from '../../../utils/validations/withdrawal.validations.js';

const routesWithdrawal = Router();

const WC = withdrawalController;
const WV = withdrawalValidation;

routesWithdrawal.post('/create', WV.create, WC.create);
routesWithdrawal.get('/all', WC.getAll);
routesWithdrawal.get('/:withdrawalId', WV.validateId, WC.getById);

routesWithdrawal.delete('/:withdrawalId', WV.validateId, WC._delete);
routesWithdrawal.patch('/:withdrawalId', WV.validateId, WV.create, WC.update);

export default routesWithdrawal;
