import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    console.log('ADMIN logging in with data:',data);
    return this.http.post('/api/admin/login', data).toPromise()
      .then(adminId => {
        console.log('adminId: ', adminId);
        
        if (adminId == false) return false;
        return adminId;
      })
      .catch(err => err);
  }

  // fetchAllAdmins() {
  //   return this.http.get('/api/admin/fetchAll').toPromise()
  //     .then(admins => admins)
  //     .catch(err => err);
  // }

  addAdmin(data: any) {
    console.log('adding admin with data: ', data);
    return this.http.post('/api/admin/addAdmin', data).toPromise()
      .then(admin => {
        console.log('returning: ', admin);
        return admin;
      })
      .catch(err => err);
  }

  checkAdminToken(admin: string) {
    console.log('CHECKING ADMIN TOKEN...', admin);
    return this.http.get(`/api/admin/checkAdminToken/${admin}`).toPromise()
      .then(token => {
        console.log('token data returned: ', token);
        if (token) return token;
        return 'admin does not have token';
      })
  }

  compileAllMetrics() {
    return this.http.get('/api/admin/compileAllMetrics').toPromise()
      .then(metrics => metrics)
      .catch(err => err);
  }

  addPage(page: any) {
    console.log('page data: ', page);
    
    return this.http.post('/api/admin/addPage', page).toPromise()
      .then(page => {
        console.log('returned value: ', page);
        return page;
      })
      .catch(err => err);
  }

  addUser(user: any) {
    return this.http.post('/api/admin/addUser', user).toPromise()
      .then(user => {
        console.log('returned value: ', user);
        return user;
      })
      .catch(err => err);
  }

  searchBy(searchQuery: any) {
    return this.http.get('/api/admin/searchUsers', {params: searchQuery}).toPromise()
      .then(searchResults => {
        console.log('search query returned: ', searchResults);
        return searchResults;
      })
      .catch(err => err);
  }
}
