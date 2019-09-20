import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default class UserController {

  /**
   * Handles signin requests
   * @param {ServerRequest} req
   * @param {ServerResponse} res
   * @returns {ServerResponse} response
   */
  static login(req, res) {
    const signinError = { message: 'Incorrect email or password' };
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) throw new Error();
        return UserUtils.validateUserPassword(user, req.body.password)
          .then((matches) => {
            if (!matches) throw new Error();
            const data = UserUtils.getPublicUserFields(user.dataValues);
            data.token = JWTService.generateToken(data);
            UserUtils.setCookie(res, data.token);
            return Response.Success(res, data);
          });
      })
      .catch(() => Response.UnauthorizedError(res, signinError));
  }

}