import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
import { MatDialog } from '@angular/material/dialog';
import { UserPasswordresetComponent } from '../user-passwordreset/user-passwordreset.component';
import { UserEmailresetComponent } from '../user-emailreset/user-emailreset.component';
import { UserPlanComponent } from '../user-plan/user-plan.component';
import { UserQuestionComponent } from '../user-question/user-question.component';
import { FaqAccountComponent } from '../faq-account/faq-account.component';
import { ReportComponent } from '../report/report.component';
import { SuggestComponent } from '../suggest/suggest.component';

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
    // this.router.navigateByUrl('account/email', {state: {visitedFrom: 'Account'}});
    this.dialog.open(UserEmailresetComponent, {
      width: '60%',
      maxWidth: '700px',
      height: '345px'
    });
  }

  goToCurrentPlan(): void {
    this.dialog.open(UserPlanComponent, {
      width: '95%',
      maxWidth: '1000px',
      height: '57%'
    });
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
    this.dialog.open(UserQuestionComponent, {
      width: '75%',
      maxWidth: '1000px',
      height: '439px'
    });
  }
  
  goToFAQs(): void {
    this.dialog.open(FaqAccountComponent, {
      width: '85%',
      maxWidth: '1000px',
      height: '490px'
    });
  }

  goToSuggestFeature(): void {
    this.dialog.open(SuggestComponent, {
      width: '75%',
      maxWidth: '1000px',
      height: '439px'
    });
  }

  goToReportProblem(): void {
    this.dialog.open(ReportComponent, {
      width: '75%',
      maxWidth: '1000px',
      height: '439px'
    });
  }

  goToReportUser(): void {
    this.router.navigateByUrl('report', {state: {visitedFrom: 'Account', problem: 'user'}});
  }


}
