import Sequelize from 'sequelize';

import databaseConfig from '../config/databaseConfig';

import User from '../app/models/User';
import Files from '../app/models/Files'
import Meetup from '../app/models/Meetup'

const models = [User,Files,Meetup];

class Database{
    
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection))
        models.map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();