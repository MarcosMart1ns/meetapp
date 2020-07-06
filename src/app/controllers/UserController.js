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
        const { email, oldPassowrd } = req.body

        const user = await User.findByPk(req.userId);

        if(email != user.email){
            const UserExiste = User.findOne({ where: email })

            if(UserExiste){
                return res.status(401).json({error: 'Email já cadastrado'});
            }
        }
        
        if(oldPassowrd && !(await user.checkPassword(oldPassowrd))){
            return res.status(401).json({error: 'Senha incorreta'});
        }

        const { id , name } = await user.update(req.body);

        return res.json({
            msg:"ok",
            id,
            name,
            email,
        })
    }
}

export default new UserController();