import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  innerWidth!: any;
  metricHeader = 'Landing';

  @Output() adjustBackgroundImageWidth: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private windowService: WindowService, private metricsService: MetricsService, private userService: UserService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    // LINE BELOW SETS THE STARTING WIDTH OF OPENING EFFECT
    // consider this point 1
    this.windowService.bgImageWidth.next(6000);
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
    // this.windowService.bgImageMarginLeft.next(-900);
  }

  ngAfterViewInit(): void {
    const landingFeature = document.getElementById('landing-feature');
    if (this.innerWidth > 400)  { landingFeature?.classList.add('margin-top-175'); }
    if (this.innerWidth <= 400) { landingFeature?.classList.add('margin-top-300'); }
  }

  goToContact(): void {
    this.router.navigateByUrl('contact', {state: {navigatedFrom: 'Landing'}});
    // this.windowService.adjustBackgroundImageWidth(2200);
    this.windowService.adjustBackgroundImageMarginLeft(-500);
  }

  goToBook(): void {
    this.router.navigateByUrl('book', {state: {navigatedFrom: 'Landing'}});
    this.windowService.adjustBackgroundImageWidth(2400);
  }

  goToRentals(): void {
    this.router.navigateByUrl('rentals', {state: {navigatedFrom: 'Landing'}});
    this.windowService.adjustBackgroundImageWidth(3200);
  }

  goToHighlights(): void {
    this.router.navigateByUrl('highlights', {state: {navigatedFrom: 'Landing'}});
    this.windowService.adjustBackgroundImageWidth(3200);
  }

  goToUpload(): void {
    this.router.navigateByUrl('upload', {state: {navigatedFrom: 'Landing'}});
    this.windowService.bgImageWidth.next(4000);
    this.windowService.bgImageMarginLeft.next(-400);
  }

}
