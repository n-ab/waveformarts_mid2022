import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsService } from 'src/app/services/metrics.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  metricHeader = 'Account';

  constructor(private router: Router, private windowService: WindowService, private metricsService: MetricsService) { }

  ngOnInit(): void {
    this.windowService.bgImageMarginLeft.next(-50);
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  // R O U T I N G --- M E N U     O P T I O N S

  goToYourUploads(): void {

  }

  goToYourDownloads(): void {

  }

  goToManageFiles(): void {
    
  }

  goToShop(): void {
    
  }

  goToResetPassword(): void {
    
  }

  goToChangeEmail(): void {
    
  }

  goToCurrentPlan(): void {
    
  }

  goToOrderHistory(): void {
    
  }

  goToYourMessages(): void {
    
  }

  goToComposeMessage(): void {
    
  }

  goToSendFile(): void {
    
  }

  goToStarredMessages(): void {
    
  }

  goToAskQuestion(): void {
    
  }

  goToFAQs(): void {
    
  }

  goToReportProblem(): void {
    
  }

  goToSuggestFeature(): void {
    
  }

}
