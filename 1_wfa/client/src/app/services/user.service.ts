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
      .then(user => user)
      .catch(err => err);
  }

  register(data: any) {
    console.log('registering with data: ', data); 
    return this.http.post('/api/user/register', data).toPromise()
      .then(client => {console.log('client: ', client); return Object.values(client);})
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
}
