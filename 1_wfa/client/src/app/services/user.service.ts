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
    console.log('logging in: ', data);
    
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
}
