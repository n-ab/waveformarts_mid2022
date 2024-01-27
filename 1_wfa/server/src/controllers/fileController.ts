import { FileModel } from '../models/file';
import { ProjectModel, ProjectObject } from '../models/project';
import fs from 'fs';

// PART OF STEP 2

export async function uploadFile(data: any) {
    console.log('fileController.ts - data: ', data);
    console.log(`finding project with Id ${data._id}`);
    const project = await ProjectModel.findById(data._id)
        .then(project => {
            // project?.filePaths({fileType: data.fileType, filePath: `../../audioFiles/${data.companyProject}/${data.fileType}/${data.title}`});
            const filePath = {fileType: data.fileType, filePath: `audioFiles/${data.companyProject}/${data.fileType}/${data.title}`};
            project?.filePaths.push(filePath);
            console.log('saving project as: ', project);
            project?.save()
            return project?.filePaths;
        })
        .catch(e => e);

    // const file = FileModel.create({

    // });
    // return FileModel.findOneAndUpdate(data, {$set: {newFile: data}}, {new: true, upsert: true})
    // .then(async file => {
    //         const project = await ProjectModel.findById(data._id).then(project => {
    //             const finalFilePath = file.filePath + '/' + data.title
    //             console.log('finalFilePath', finalFilePath);
    //             // project!.filePaths.push(finalFilePath);
    //             project?.save();
    //         });
    //         file.filePath = `../../audioFiles/${data.companyProject}`;
    //         file.title = data.title;
    //         file.save();
    //         return file._id;
    //     })
}

export async function fetchProjectFilepaths(id: string) {
    const project = await ProjectModel.findById(id).then(project => project).catch(err => console.log('1 NO PROJECT FOUND: ', err));
    const files = project?.filePaths;
    return files;
}

// error is below
export async function fetchFullFiles(id: string) {
    const files: any = [];
    const project = await ProjectModel.findById(id).then(project => project).catch(err => console.log('2 NO PROJECT FOUND: ', err));
    if (project) {
        project.filePaths.forEach(async file => {
            const data = await fs.promises.readFile(file.filePath).catch(error => console.error(error));
            files.push({data: data, file: file});
        }); 
    }
    return files;
}

export async function removeFile(data: any) {
    const project = await ProjectModel.findById(data.projectId)
    .then(project => {
        // project
    })
    .catch(err => console.log('3 NO PROJECT FOUND: ', err));
    
    return;
}