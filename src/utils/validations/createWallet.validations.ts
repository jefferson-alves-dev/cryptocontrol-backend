import { body } from 'express-validator';

const createWallet = [
  body('name').escape().not().isEmpty().withMessage('Name is required.'),
];

export default { createWallet };
