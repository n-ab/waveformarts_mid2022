import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  innerWidth!: any;
  @Output() adjustBackgroundImageWidth: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private windowService: WindowService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.windowService.bgImageWidth.next(6000);
  }

  ngAfterViewInit(): void {
    // 
    const landingFeature = document.getElementById('landing-feature');
    if (this.innerWidth > 400)  { landingFeature?.classList.add('margin-top-175'); }
    if (this.innerWidth <= 400) { landingFeature?.classList.add('margin-top-300'); }
  }

  goToUpload(): void {
    console.log('goToUpload()');
    this.router.navigateByUrl('upload');
    this.windowService.adjustBackgroundImageWidth(2000);
  }

}
