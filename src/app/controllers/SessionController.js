import User from '../models/User'
import jwt from 'jsonwebtoken'
import auth from '../../config/auth'

class SessionController{
    async create(req,res){
        const { email, password } = req.body;

        const user = await User.findOne({where: { email }} )
        
        if(!user){
            return res.status(401).json({erro: "Usuário não encontrado!"})
        }

        if( !(await user.checkPassword(password)) ){
            return res.status(401).json({ erro: "Senha incorreta"})
        }
        
        const { name } = user;

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