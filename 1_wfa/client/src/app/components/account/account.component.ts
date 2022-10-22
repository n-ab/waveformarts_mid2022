import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
import { MatDialog } from '@angular/material/dialog';
import { UserPasswordresetComponent } from '../user-passwordreset/user-passwordreset.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  metricHeader = 'Account';
  user!: User;

  constructor(private router: Router, private windowService: WindowService, private metricsService: MetricsService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.check()
      .then (userFound => {
        if (userFound) {
          this.user = userFound;
        } else {
          this.router.navigateByUrl('');
        }
      })
    this.windowService.bgImageMarginLeft.next(-50);
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  // R O U T I N G --- M E N U     O P T I O N S

  goToYourUploads(): void {
    this.router.navigateByUrl('account/files', {state: {navigatedFrom: 'Account', selection: 'uploads' }});
  }

  goToYourDownloads(): void {
    this.router.navigateByUrl('account/files', {state: {navigatedFrom: 'Account', selection: 'downloads' }});
  }

  goToManageFiles(): void {
    this.router.navigateByUrl('account/files', {state: {navigatedFrom: 'Account', selection: 'home' }});
  }

  goToShop(): void {
    this.router.navigateByUrl('store', {state: {visitedFrom: 'Account'}});
  }

  goToResetPassword(): void {
    this.dialog.open(UserPasswordresetComponent, {
      width: '60%',
      maxWidth: '700px',
      height: '345px'
    });
  }

  goToChangeEmail(): void {
    this.router.navigateByUrl('account/email', {state: {visitedFrom: 'Account'}});
  }

  goToCurrentPlan(): void {
    this.router.navigateByUrl('account/currentplan', {state: {visitedFrom: 'Account'}});
  }

  goToOrderHistory(): void {
    this.router.navigateByUrl('account/orders', {state: {visitedFrom: 'Account'}});
  }

  goToYourMessages(): void {
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'home'}});
  }

  goToComposeMessage(): void {
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'compose'}});
  }
  
  goToStarredMessages(): void {
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'starred'}});
  }
  
  goToSendFile(): void {
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'file'}});
  }

  goToAskQuestion(): void {
    this.router.navigateByUrl('account/question', {state: {visitedFrom: 'Account'}});
  }
  
  goToFAQs(): void {
    this.router.navigateByUrl('account/faq', {state: {visitedFrom: 'Account'}});
  }

  goToSuggestFeature(): void {
    this.router.navigateByUrl('account/faq', {state: {visitedFrom: 'Account'}});
  }

  goToReportProblem(): void {
    this.router.navigateByUrl('report', {state: {visitedFrom: 'Account', problem: 'site'}});
  }

  goToReportUser(): void {
    this.router.navigateByUrl('report', {state: {visitedFrom: 'Account', problem: 'user'}});
  }


}
