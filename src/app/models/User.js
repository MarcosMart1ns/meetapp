import { Model } from 'sequelize';

class User extends Model{
    static init(sequelize){
        super.init({
            id: sequelize.STRING,
            name: sequelize.STRING,
            password_hash: sequelize.STRING,
        },
        {
            sequelize,
        }
        )
    }
}

export default User;
