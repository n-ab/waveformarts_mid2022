import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  @Input() width: number = 3000;
  @Input() marginLeft: number = 6000;
  @Input() marginTop: number = 0;

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
    setTimeout(() => {
      // LINE BELOW SETS THE DESTINATION WIDTH OF OPENING EFFECT
      // consider this point 2
      this.width = 3600;
      this.marginLeft = -200;
    }, 1);
    setInterval(() => {
      // console.log('current width of bg image: ', this.width);
    }, 1500)
    this.updateWidth();
    this.updateMarginLeft();
  }

  updateWidth(): void {
    this.windowService.bgImageWidth.subscribe(pixelWidth => {
      this.width = pixelWidth;
    })
  }

  updateMarginLeft(): void {
    this.windowService.bgImageMarginLeft.subscribe(pixelAmount => {
      this.marginLeft = pixelAmount;
    })
  }

  updateMarginTop(): void {
    this.windowService.bgImageMarginTop.subscribe(pixelAmount => {
      this.marginTop = pixelAmount;
    })
  }

}
