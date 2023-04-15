import { body } from 'express-validator';

const createUser = [
  body('name').escape().not().isEmpty().withMessage('Name is required.'),
  body('email').escape().not().isEmpty().withMessage('Email is required.'),
  body('password')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password is required.'),
  body('name')
    .escape()
    .isLength({ min: 3 })
    .withMessage('The name must consist of at least 3 letters.'),
  body('email')
    .escape()
    .isEmail()
    .withMessage('The email is not in a valid format.'),
  body('password')
    .escape()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
];

export default { createUser };
