import User from '../models/User'
import jwt from 'jsonwebtoken'
import auth from '../../config/auth'
import * as Yup from "yup";

class SessionController{
    async create(req,res){
        const schema= Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "erro na validação"})
        }

        const { email, password } = req.body;

        const user = await User.findOne({where: { email }} )
        
        if(!user){
            return res.status(401).json({erro: "Usuário não encontrado!"})
        }

        if( !(await user.checkPassword(password)) ){
            return res.status(401).json({ erro: "Senha incorreta"})
        }
        
        const { id, name } = user;

        return res.status(201).json({
            name,
            email,
            token: jwt.sign({ id }, auth.segredo,{
                expiresIn: auth.expiresIn,
            }),             
        });
    }
}

export default new SessionController();