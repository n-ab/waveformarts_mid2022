import { FileModel } from '../models/file';

// PART OF STEP 2

export async function uploadFile(data: any) {
    console.log('fileController - uploadFile data: ', data);

    // you need to decide if you want to refer to sound files as 'sounds' or 'files'

    return FileModel.findOneAndUpdate(data, {$set: {newFile: data}}, {new: true, upsert: true})
        .then(async file => {

            // 1
            // this shit currently has: 
            // companyProject
            // description
            // email

            // 2
            // this shit needs: 
            // filepath
            // file name
            // associated project name
            // uploader (user id must be in project.users)
            // upload date
            // length
            // 

            console.log('file: ', file);
            file.save();
            console.log('file saved. filepath: ', file.filePath);
            return file._id;
        })
}