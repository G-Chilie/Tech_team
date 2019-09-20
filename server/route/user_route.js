import UserController from '../controller/user_controller' ;


router.post('/auth/signin',  UserController.login);