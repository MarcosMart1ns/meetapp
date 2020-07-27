import * as Yup from 'yup';
import { parseISO, isAfter } from 'date-fns';

import Meetup from '../models/Meetup';


class MeetupController{
    async store ( req, res ){
        
        const schema = Yup.object().shape({
            title: Yup.string().required() ,
            description: Yup.string().required(),
            localization: Yup.string().required(),
            date: Yup.date().required(),
            banner_path: Yup.number().required(),
        })
        
        if(!(schema.validate(req.body))){
            return res.json({error:'Validation error! Verify input data, if is equal to the model.'})
        }

        const { date } = req.body;

        if(   !(isAfter(parseISO(date), new Date()))){
            return res.json({ error: 'The date cannot be past, only future'})
        }

        const meetup = await Meetup.create(
            req.userId,
            req.body,
        )

        return res.json(meetup)
    }
}

export default new MeetupController();