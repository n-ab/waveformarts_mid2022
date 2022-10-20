import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private http: HttpClient) { }

  addPageMetrics(currentPage: string, navigatedFrom: string) {
    return this.http.post('/api/metrics/addPageMetrics', {currentPage, navigatedFrom}).toPromise()
      .then(resultsConfirmed => resultsConfirmed)
      .catch(err => err);
  }

  addPageCount(page: string) {
    console.log('adding page count for page: ', page);
    const data = new FormData();
    data.append('title', page);
    return this.http.post('/api/metrics/addPageCount', {page}).toPromise()
      .then(page => page)
      .catch(err => err);
  }

  addPageVisitedFrom(currentPage: string, navigatedFrom: string) {
    return this.http.post('/api/metrics/addPageVisitedFrom', {currentPage, navigatedFrom}).toPromise()
      .then(metric => metric)
      .catch(err => err);
  }
}
