import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  multipartForm = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private http: HttpClient, private router: Router) { }

  // STEP 1

  prepareDestinationFolder(data: any) {
    return this.http.post('/api/file/prepareDestinationFolder', data).toPromise()
    .then(folderName => folderName)
    .catch(err => err);
  }

  // STEP 2
  
  uploadFile(formData: FormData) {
    return this.http.post('/api/file/uploadFile', formData).toPromise()
      .then(finalResult => finalResult)
      .catch(err => err);
  }

}
