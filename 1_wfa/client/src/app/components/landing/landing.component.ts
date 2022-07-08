import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      const landingFeature = document.getElementById('landing-feature');
      setTimeout(() => {
        landingFeature?.classList.remove('landing-feature-pre')
        landingFeature?.classList.add('landing-feature-post');
      }, 1500);
  }

}
