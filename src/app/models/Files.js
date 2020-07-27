import Sequelize, { Model } from "sequelize";

class Files extends Model{
    static init(sequelize){
        super.init({
            path: Sequelize.STRING,
            file: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get (){
                    return `http://localhost:3636/files/${this.path}`
                }
                
            }
        },
        {
            sequelize
        }
        );

        return this;
    }
}

export default Files;