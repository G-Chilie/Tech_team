import { check, validationResult } from 'express-validator';
import Responses from '../utils/response.utils';

export default class AuthenticationMiddleware {

  static validateSigninFields() {
    return [
      [
        check('email').exists().isEmail(),
        check('password').exists().isLength({ min: 8 })
      ],
      (req, res, next) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) return Responses.UnauthorizedError(res, signinError);
        next();
      }
    ];
  }

}