import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // app_www_form_urlencoded = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: HttpClient) { }

  check() {
    return this.http.get('/api/user/check').toPromise()
      .then(user => user)
      .catch(err => err);
  }

  login(data: any) {
    return this.http.post('/api/user/login', data).toPromise()
      .then(user => {
        if (Object.keys(user).indexOf('message') == -1) { return user } 
        else { return Object.values(user)[0]; }
      })
      .catch(err => err);
  }

  logout() {
    const logoutToken = '';
    return this.http.post('/api/user/logout', logoutToken).toPromise()
      .then(userLogoutConfirmed => userLogoutConfirmed)
      .catch(err => err);
  }

  register(data: any) {
    console.log('registering with data: ', data); 
    return this.http.post('/api/user/register', data).toPromise()
      .then(client => client)
      .catch(err => console.log('error registering: ', err));
  }

  fetchFiles() {
    return this.http.get('/api/user/fetchFiles').toPromise()
      .then(files => files)
      .catch(err => err)
  }

  changePassword(data: any) {
    return this.http.post('/api/user/changePassword', data).toPromise()
      .then(user => user)
      .catch(err => err);
  }

  changeEmail(data: any) {
    return this.http.post('/api/user/changeEmail', data).toPromise()
      .then(user => user)
      .catch(err => err);
  }

  fetchPlan() {
    return this.http.get(`/api/user/fetchPlan`).toPromise()
      .then(plan => plan)
      .catch(err => err);
  }

  askQuestion(question: any) {
    return this.http.post('/api/user/askQuestion', question).toPromise()
      .then(question => question)
      .catch(err => err);
  }

  reportIssue(issue: any) {
    return this.http.post('/api/user/askQuestion', issue).toPromise()
      .then(question => question)
      .catch(err => err);
  }

  makeSuggestion(issue: any) {
    return this.http.post('/api/user/makeSuggestion', issue).toPromise()
      .then(suggestion => suggestion)
      .catch(err => err);
  }

  fetchMessages() {
    return this.http.get('/api/user/fetchMessages').toPromise()
      .then(messages => messages)
      .catch(err => err);
  }

  submitMessage(message: any) {
    return this.http.post('/api/user/submitMessage', message).toPromise()
      .then(message => message)
      .catch(err => err);
  }

  fetchPopulatedUserData() {
    return this.http.get('/api/user/fetchPopulatedUserData').toPromise()
      .then(userData => userData)
      .catch(err => err);
  }

  submitProject(project: any) {
    return this.http.post('/api/project/createProject', project).toPromise()
      .then(project => project)
      .catch(err => err);
  }

  joinProject(projectNumber: string) {
    return this.http.post('/api/project/joinProject', projectNumber).toPromise()
      .then(projectUsers => projectUsers)
      .catch(err => err);
  }

  contact(data: any) {
    return this.http.post('/api/project/contact', data).toPromise()
      .then(user => user)
      .catch(err => err);
  }
}
