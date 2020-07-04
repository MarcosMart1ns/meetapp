import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from "./app/controllers/SessionController";


const routes = new Router();

routes.get('/',(req,res)=>{
    return res.json({ message: "tudo ok"});
})

routes.post('/user', UserController.store);
routes.post('/login', SessionController.create );
routes.put('/user', UserController.update);

export default routes;