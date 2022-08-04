import { FileModel } from '../models/file';

export async function uploadFile(data: any) {
    console.log('fileController - uploadFile(): ', data);
    
    return FileModel.findOneAndUpdate(data, {$set: {newFile: data}}, {new: true, upsert: true})
        .then(async file => {
            file.save();
            console.log('file saved. filepath: ', file.filePath);
            return file._id;
        })
}