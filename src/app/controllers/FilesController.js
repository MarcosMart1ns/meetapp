import Files from '../models/Files';


class FilesController{
    async store( req,res ){
        const {originalname: file , filename: path} = req.file
        console.log(`file: ${file}\n path: ${path}`)

        const filePathName = await Files.create({
            file,
            path
        })

        return res.json(filePathName);
    }

}

export default new FilesController();