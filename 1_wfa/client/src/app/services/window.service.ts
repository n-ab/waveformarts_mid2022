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
  marginTop!: number;
  bgImageWidth: BehaviorSubject<number> = new BehaviorSubject(this.pixelWidth);
  bgImageMarginLeft: BehaviorSubject<number> = new BehaviorSubject(this.marginLeft);
  bgImageMarginTop: BehaviorSubject<number> = new BehaviorSubject(this.marginTop);

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

  adjustBackgroundImageMarginTop(pixels: number) {
    console.log(`setting background image MARGIN-TOP to ${pixels} pixels`);
    this.marginTop = pixels;
    this.bgImageMarginTop.next(this.marginTop);
  }
}
