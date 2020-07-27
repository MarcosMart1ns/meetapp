import Sequelize, { Model } from 'sequelize';

class Meetup extends Model{
    static init(sequelize){
        super.init({
            title: Sequelize.STRING,
            description: Sequelize.STRING,
            localization: Sequelize.STRING,
            date: Sequelize.DATE,
            banner_path: Sequelize.INTEGER,
            creator: Sequelize.INTEGER
        },
        {
            sequelize,
        }
        );

        return this
    }

    static associate(models){
        this.belongsTo(models.Files,{foreignKey: 'banner_path', as : 'banner'});
        this.belongsTo(models.User,{foreignKey: 'creator', as : 'organizer'});
    }

}

export default Meetup;