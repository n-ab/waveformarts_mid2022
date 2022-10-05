import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  @Input() width: number = 3000;
  @Input() marginLeft: number = 0;

  constructor(private windowService: WindowService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = 5900;
      this.marginLeft = -50;
    }, 1);
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

}
