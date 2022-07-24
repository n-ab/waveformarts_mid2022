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
    
    
  }

  ngAfterViewInit(): void {
    const header = document.getElementById('header');
    const landingFeature = document.getElementById('landing-feature');
    if (this.innerWidth > 400)  { landingFeature?.classList.add('margin-top-175'); }
    if (this.innerWidth <= 400) { landingFeature?.classList.add('margin-top-300'); }
    setTimeout(() => {
      header?.classList.add('display-none');
    }, 500);
  }

  goToUpload(): void {
    this.windowService.adjustBackgroundImageWidth('upload');
    this.router.navigateByUrl('upload');
  }

}
