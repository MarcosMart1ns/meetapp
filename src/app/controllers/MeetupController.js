import * as Yup from 'yup';
import { parseISO, isAfter,endOfDay,differenceInCalendarDays,startOfDay,endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import Files from '../models/Files'
import User from '../models/User';


class MeetupController{
    async index (req, res){
        const meetups = await Meetup.findAll({
            where: {
                creator: req.userId
            },
            attributes: ['id','title','description','localization','date'],
            order: ['date'],
            include: [
                {
                    model: Files,
                    as: 'banner',
                    attributes: ['id','url','path']
                },
            ] 
        })

        return res.status(200).json(meetups);
    }

    async indexAll(req,res){
        const { date, page } = req.query;

        const start = startOfDay(parseISO(date));
        const end = endOfDay(parseISO(date));

        const meetups = await Meetup.findAll({
            attributes: ['id','title','description','localization','date'],
            order: ['date'],
            limit: 10,
            offset: (page*10)-10,
            where:{
                date:{
                    [Op.between] : [start, end]
                } 
            },
            include: [
                {
                    model: Files,
                    as: 'banner',
                    attributes: ['id','url','path']
                },
                {
                    model: User,
                    as: 'MeetupCreator',
                    attributes: ['id','name','email']
                }
            ] 
        })

        return res.status(200).json(meetups);
    }

    async store ( req, res ){
        
        const schema = Yup.object().shape({
            title: Yup.string().required() ,
            description: Yup.string().required(),
            localization: Yup.string().required(),
            date: Yup.date().required(),
            banner_path: Yup.number().required(),
        })
        
        if(!(await schema.isValid(req.body))){
            return res.json({error:'Validation error! Verify input data, if is equal to the model.'})
        }

        const { date,title, description,localization,banner_path } = req.body;

        if(   !(isAfter(parseISO(date), new Date()))){
            return res.json({ error: 'The date cannot be past, only future'})
        }

        const meetup = await Meetup.create({
            date,
            title, 
            description,
            localization,
            banner_path ,
            creator: req.userId    
        })

        return res.json(meetup)
    }

    async update (req, res){
        const schema = Yup.object().shape({
            title: Yup.string(),
            description: Yup.string(),
            localization: Yup.string(),
            date: Yup.date(),
            banner_path: Yup.number(),
        })

        if(!(await schema.isValid(req.body))){
            return res.json({error:'Validation error! Verify input data, if is equal to the model.'})
        }

        
        if(   !(isAfter(parseISO(req.body.date), new Date()))){
            return res.json({ error: 'The date cannot be past, only future'})
        }

        const meetup = await Meetup.findByPk(req.params.id);

        if( meetup.creator != req.userId ){
            return res.json({error: 'You do not have permission to edit this meetup'})
        }

        
        const { title, description, localization, date, banner_path } = await meetup.update(
            req.body
        )

        return res.json({
            title, 
            description, 
            localization, 
            date, 
            banner_path
        });
    }

    async delete (req, res){
        const { id } = req.params;
        
        const meetup = await Meetup.findByPk(id);
        
        if(!meetup){
            return res.status(400).json({error: " This meetup doesn't exists or already deleted/canceled"});
        }
        
        if(req.userId != meetup.creator){
            return res.status(401).json({error: 'Unauthorized access! You can only cancel meetups made by you'})
        }

        const timeDiference = differenceInCalendarDays(meetup.date,new Date())

        if(timeDiference<1){
            return res.status(400).json({error: "is only possible to cancel a meetup that didn't passed"});
        }
        meetup.destroy();
        return res.status(200).json({Sucess: "Meetup cancelled"});;
    }
}

export default new MeetupController();