import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  currentProject: BehaviorSubject<string> = new BehaviorSubject('noProjectSelected');

  constructor(private http: HttpClient, private router: Router) { }

  startProject(data: FormData) {
    return this.http.post('/api/project/startProjectWithNoFiles', data).toPromise()
      .then(project => project)
      .catch(err => err);
  }

  fetchProjects(projectIds: string[]) {
    let headers = new HttpHeaders();
    headers.append('projectIds', projectIds);
    return this.http.get('/api/project/fetchProjects', {headers: headers}).toPromise()
      .then(projects => projects)
      .catch(err => err)
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
    console.log('repopulate --- projectId: ', projectId);
    return this.http.get(`/api/project/repopulateTeamMembers/${projectId}`).toPromise()
      .then(teamMemberArray => {
        console.log('teammemberArray = ', teamMemberArray);
        return teamMemberArray;
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

  startADiscussion(data: any) {
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

}
