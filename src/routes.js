import { Router } from 'express';
import UserController from './app/controllers/UserController';


const routes = new Router();

routes.get('/',(req,res)=>{
    return res.json({ message: "tudo ok"});
})

routes.post('/user', UserController.store);

export default routes;