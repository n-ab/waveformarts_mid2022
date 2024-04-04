import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  currentProject: BehaviorSubject<string> = new BehaviorSubject('noProjectSelected');

  constructor(private http: HttpClient, private router: Router) { }

  startProject(data: FormData) {
    console.log('2 2 2 2 ');
    return this.http.post('/api/project/startProject', data).toPromise()
      .then(data => data)
      .catch(err => err);
  }

  fetchFiles(projectId: string) {
    this.http.get(`/api/project/fetchFiles/${projectId}`).toPromise()
      .then(files => files)
      .catch(err => err);
  }

  fetchProjects(projectIds: string[]) {
    let headers = new HttpHeaders();
    headers.append('projectIds', projectIds);
    return this.http.get('/api/project/fetchProjects', {headers: headers}).toPromise()
      .then(projects => projects)
      .catch(err => err);
  }

  fetchProjectsByUserId() {
    return this.http.get('/api/project/fetchProjectsByUserId').toPromise()
      .then(projects => projects)
      .catch(err => err);
  }

  getProjectData(id: any) {
    return this.http.get(`/api/project/getProjectData/${id}`).toPromise()
      .then(project => project)
      .catch(e => e.error);
  }

  logInToProject(data: any) {
    return this.http.post('/api/project/loginToProject', data).toPromise()
      .then(project => project)
      .catch(err => err);
  }

  addUserToProject(data: any, projectId: string) {
    data['projectId'] = projectId;
    return this.http.post('/api/project/addUserToProject', data).toPromise()
      .then(projectUsers => projectUsers)
      .catch(err => err);
  }

  repopulateTeamMembers(projectId: string) {
    // console.log('repopulate --- projectId: ', projectId);
    return this.http.get(`/api/project/repopulateTeamMembers/${projectId}`).toPromise()
      .then(teamMemberArray => {
        // console.log('teammemberArray = ', teamMemberArray);
        return teamMemberArray;
      })
      .catch(err => err);
  }

  repopulateDiscussions(projectId: string) {
    return this.http.get(`/api/project/repopulateDiscussions/${projectId}`).toPromise()
      .then(discussionArray => {
        console.log('discussionArray: ', discussionArray);
        return discussionArray;
      })
      .catch(err => err);
  }

  removeFromTeam(userId: string, projectId: string) {
    const data = {userId, projectId};
    return this.http.post('/api/project/removeFromTeam', data).toPromise()
      .then(teamMemberArray => teamMemberArray)
      .catch(err => err);
  }

  addFileToProject(data: any) {
    return this.http.post('/api/project/addFileToProject', data).toPromise()
      .then(projectFiles => projectFiles)
      .catch(err => err);
  }

  startADiscussion(data: any, projectId: string) {
    data.projectId = projectId;
    return this.http.post('/api/project/startADiscussion', data).toPromise()
      .then(projectDiscussions => projectDiscussions)
      .catch(err => err);
  }

  addMessageToExistingDiscussion(data: any) {
    return this.http.post('/api/project/addMessageToExistingDiscussion', data).toPromise()
      .then(projectDiscussions => projectDiscussions)
      .catch(err => err);
  }

  messageEngineer(data: any) {
    return this.http.post('/api/project/messageProjectEngineer', data).toPromise()
      .then(projectMessages => projectMessages)
      .catch(err => err);
  }

  uploadFilesToProject(files: any) {
    console.log('$$$$$$$$$', files);
    return this.http.post('/api/project/uploadFilesToProject', files).toPromise()
      .then(updatedFileList => {
        console.log(updatedFileList);
        return updatedFileList;
      })
      .catch(err => err);
  }

  uploadFile(file: File, filetype: string): Observable<any> {
    console.log('uploading file: ', file);
    console.log('with type: ', filetype);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('filetype', filetype);
    return this.http.post('/api/project/uploadFile', formData);
  }

}
