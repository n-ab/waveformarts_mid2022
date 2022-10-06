import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    console.log('ADMIN logging in with data: ', data);
    
    return this.http.post('/api/admin/adminLogin', data).toPromise()
      .then(success => success)
      .catch(err => err);
  }
}
