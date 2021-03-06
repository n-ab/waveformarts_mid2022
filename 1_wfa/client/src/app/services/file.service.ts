import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private router: Router) { }

  uploadFile(data: any) {
    const postData = new FormData();
    postData.append('title', data.title);
    postData.append('tasks', data.tasks);
    postData.append('audioFile', data.audioFile);
    return this.http.post('/api/file/upload', postData).toPromise()
      .then(file => {
        console.log('file saved as: ', file);
        
      })
  }

}
