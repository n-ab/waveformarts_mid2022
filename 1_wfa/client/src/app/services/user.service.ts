import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
}
