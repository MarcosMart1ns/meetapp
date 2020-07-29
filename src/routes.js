import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from "./app/controllers/SessionController";
import FilesController from "./app/controllers/FilesController";
import MeetupController from './app/controllers/MeetupController';

import authMid from './app/middlewares/auth'
import multerConfig from './config/multer'


const routes = new Router();
const upload = multer(multerConfig);

routes.get('/',(req,res)=>{
    return res.json({ message: "tudo ok"});
})

routes.post('/user', UserController.store);
routes.post('/login', SessionController.create );

routes.use(authMid); //todas as requisições abaixo o usuário deve estar logado;

routes.put('/user', UserController.update);
routes.post('/files', upload.single('avatar'),FilesController.store);
routes.post('/meetup',MeetupController.store);
routes.get('/meetup',MeetupController.index);
routes.put('/meetup/:id',MeetupController.update);

export default routes;