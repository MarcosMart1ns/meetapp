import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from "./app/controllers/SessionController";

import authMid from './app/middlewares/auth'

const routes = new Router();

routes.get('/',(req,res)=>{
    return res.json({ message: "tudo ok"});
})

routes.post('/user', UserController.store);
routes.post('/login', SessionController.create );

routes.use(authMid); //todas as requisições abaixo o usuário deve estar logado;

routes.put('/user', UserController.update);

export default routes;