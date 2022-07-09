import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  innerWidth!: any;

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log('this.innerWidth = ', this.innerWidth);
    console.log('this.innerHeight', window.innerHeight);
    
    
  }

  ngAfterViewInit(): void {
      const landingFeature = document.getElementById('landing-feature');
      if (this.innerWidth > 400)  { landingFeature?.classList.add('margin-top-700'); }
      if (this.innerWidth <= 400) { landingFeature?.classList.add('margin-top-300')}
  }

}
