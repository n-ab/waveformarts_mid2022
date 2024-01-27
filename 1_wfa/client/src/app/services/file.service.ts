import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  multipartForm = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private http: HttpClient, private router: Router) { }

  prepareDestinationFolder(data: any) {
    return this.http.post('/api/file/prepareDestinationFolder', data).toPromise()
    .then(directory => directory)
    .catch(err => err);
  }
  
  uploadFile(formData: FormData) {
    return this.http.post('/api/file/uploadFile', formData).toPromise()
      .then(finalResult => finalResult)
      .catch(err => err);
  }

  removeFile(projectId: string, type: string) {
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('type', type);
    return this.http.post('/api/file/removeFile', formData).toPromise()
      .then(updatedFileList => updatedFileList)
      .catch(e => e);
  }

  refreshFiles(id: string) {
    return this.http.get(`/api/file/fetchProjectFiles/${id}`).toPromise()
      .then(files => files)
      .catch(err => err);
  }

  renderFullFiles(id: string) {
    return this.http.get(`/api/file/fetchFullFiles/${id}`).toPromise()
      .then(files => files)
      .catch(err => err);
  }

  fetchReadableStream(title: string, event: any) {
    return this.http.get<ReadableStream>(`http://localhost:8000/audioFiles/${title}/${event}`);
  }
}