import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  @Input() width: number = 3000;

  constructor(private windowService: WindowService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.width = 4001;
    }, 1);
    this.updateWidth();
  }

  

  updateWidth(): void {
    this.windowService.bgImageWidth.subscribe(pixelWidth => {
      this.width = pixelWidth;
    })
  }

}
