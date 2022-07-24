import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  routeSelected = '';
  updateBackgroundImageWidth = new Observable<string>(data => {
    data.next(this.routeSelected);
  });

  constructor(private http: HttpClient, private router: Router) { }

  adjustBackgroundImageWidth(route: string) {
    console.log('this.routeSelected = ', route);
    this.routeSelected = route;
  }
}
