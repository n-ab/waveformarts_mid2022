import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  currentProject: BehaviorSubject<string> = new BehaviorSubject('noProjectSelected');

  constructor(private http: HttpClient, private router: Router) { }

  startProject(data: FormData) {
    return this.http.post('/api/project/startProject', data).toPromise()
      .then(project => {
        console.log('project started and saved: ', project);
        return this.router.navigateByUrl('project', {state: {project: project}});
      })
      .catch(err => err);
  }

  getProjectData(projectId: string) {
    return this.http.get(`/api/project/getProjectData/${projectId}`).toPromise()
      .then(project => project)
      .catch(e => e.error);
  }

}
