import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  pixelWidth!: number;
  marginLeft!: number;
  bgImageWidth: BehaviorSubject<number> = new BehaviorSubject(this.pixelWidth);
  bgImageMarginLeft: BehaviorSubject<number> = new BehaviorSubject(this.marginLeft);

  constructor(private http: HttpClient, private router: Router) { }

  adjustBackgroundImageWidth(pixels: number) {
    console.log(`setting background image WIDTH to ${pixels} pixels`);
    this.pixelWidth = pixels;
    this.bgImageWidth.next(this.pixelWidth);
  }

  adjustBackgroundImageMarginLeft(pixels: number) {
    console.log(`setting background image MARGIN-LEFT to ${pixels} pixels`);
    this.marginLeft = pixels;
    this.bgImageMarginLeft.next(this.marginLeft);
  }
}
