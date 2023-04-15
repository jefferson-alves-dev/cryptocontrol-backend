import { header, param } from 'express-validator';

const isIdNumber = [
  header('userId')
    .escape()
    .isNumeric()
    .withMessage('The expected value is of type number.'),
];

export default { isIdNumber };
