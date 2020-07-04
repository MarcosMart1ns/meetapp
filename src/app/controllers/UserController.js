import User from '../models/User'

class UserController{
    async store(req,res){
        const UserExiste = await User.findOne({where:{email: req.body.email} });

        if(UserExiste){
            return res.status(401).json({Error:"Usuário já existe"});
        }

        const {name, email, password} = await User.create(req.body);
       
        return res.status(201).json({
            name, 
            email, 
            password
        });
    }

    async update(req,res){
        return res.json({msg:"ok"})
    }
}

export default new UserController();