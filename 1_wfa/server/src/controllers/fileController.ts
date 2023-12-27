import { FileModel } from '../models/file';
import { ProjectModel, ProjectObject } from '../models/project';

// PART OF STEP 2

export async function uploadFile(data: any) {
    console.log(`finding project with Id ${data._id}`);
    return FileModel.findOneAndUpdate(data, {$set: {newFile: data}}, {new: true, upsert: true})
    .then(async file => {
            const project = await ProjectModel.findById(data._id).then(project => {
                const finalFilePath = file.filePath + '/' + data.title
                console.log('finalFilePath', finalFilePath);
                project!.filePaths.push(finalFilePath);
                project?.save();
            });
            file.filePath = `../../audioFiles/${data.companyProject}`;
            file.title = data.title;
            file.save();
            return file._id;
        })
}

export async function fetchProjectFiles(id: string) {
    const project = await ProjectModel.findById(id).then(project => project).catch(err => console.log('NO PROJECT FOUND: ', err));
    const files = project?.filePaths;
    return files;
}