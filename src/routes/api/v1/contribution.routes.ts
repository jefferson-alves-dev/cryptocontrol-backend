import { Router } from 'express';
import contributionController from '../../../controllers/api/v1/contribution.controller.js';
import contributionValidation from '../../../utils/validations/contribution.validations.js';

const CC = contributionController;
const CV = contributionValidation;

const routesContribution = Router();

routesContribution.post('/create', CV.contributionBody, CC.create);

routesContribution.get('/all', CC.getAll);
routesContribution.get('/:contributionId', CV.validateId, CC.getById);
routesContribution.delete('/:contributionId', CV.validateId, CC._delete);

routesContribution.patch(
  '/:contributionId',
  CV.validateId,
  CV.contributionBody,
  CC.update
);

export default routesContribution;
