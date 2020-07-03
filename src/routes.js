import { Router } from 'express';

const routes = new Router();

routes.get('/',(req,res)=>{
    return res.json({ message: "tudo ok"});
})

routes.post('/user',(req,res)=>{
    const { user, email, password } = req.body;
    return res.json(req.body);
})

export default routes;