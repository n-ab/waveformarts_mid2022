import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  pixelWidth!: number;
  bgImageWidth: BehaviorSubject<number> = new BehaviorSubject(this.pixelWidth);

  constructor(private http: HttpClient, private router: Router) { }

  adjustBackgroundImageWidth(pixels: number) {
    this.pixelWidth = pixels;
    console.log('setting pixel width of background image to: ', this.pixelWidth);
    
    this.bgImageWidth.next(this.pixelWidth);
  }
}
