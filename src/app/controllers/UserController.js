import User from '../models/User'
import * as Yup from 'yup';

class UserController{
    async store(req,res){
        const schema= Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "erro na validação"})
        }

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

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword',(oldPassword,field)=>{
                    return oldPassword ? field.required() : field;  
                }),
            confirmPassword: Yup.string().when('password',(password, field)=>{
                return password ? field.required().oneOf([Yup.ref('password')]) : field;
            })
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "erro na validação"})
        }

        const { email, oldPassowrd } = req.body

        const user = await User.findByPk(req.userId);

        if (email != undefined && email != user.email){
            
            const UserExiste = await User.findOne({ where: {email} })

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