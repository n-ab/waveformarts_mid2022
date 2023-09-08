import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Project } from 'src/app/models';
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
import { JoinprojectComponent } from '../joinproject/joinproject.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { StartProjectComponent } from '../start-project/start-project.component';
import { FormControl, FormGroup } from '@angular/forms';

interface Selectedfile {
  file: File; 
  dataURL: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  metricHeader = 'Account';
  user!: User;
  userProjects: Project[] = [];
  userSounds: File[] = [];
  selectedFiles: File[] = [];
  fileUploadForm!: FormGroup;

  constructor(private router: Router, private windowService: WindowService, private metricsService: MetricsService, private userService: UserService, private dialog: MatDialog) {
    this.fileUploadForm = new FormGroup({
      audioFile: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.userService.check()
      .then (userFound => {
        if (userFound) {
          this.user = userFound;
        } else {
          this.router.navigateByUrl('');
        }
      })
    this.windowService.bgImageMarginLeft.next(-2600);
    this.windowService.bgImageWidth.next(5000);
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  startProject() {
    this.dialog.open(StartProjectComponent, {
      width: '400px',
      height: '420px',
      maxWidth: '700px'
    })
  }

  joinProject() {
    this.dialog.open(JoinprojectComponent, {
      width: '50%',
      height: '250px',
      maxWidth: '700px',
      data: this.user._id
    });
  }
  

  async uploadFile(event: Event) {
    if ((event.target as HTMLInputElement).files![0] != null) {
      const files = (event.target as HTMLInputElement).files!;
      const fileList = await Array.prototype.forEach.call(files, file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.selectedFiles.push(file);
      });
      this.userService.uploadFileToUser(fileList);
    }
    
    // console.log('upload file event: ', event);
    // const files = (event?.target as HTMLInputElement).files!;
    // if (files && files.length > 0) {
    //   const formData = new FormData();
    //   this.selectedFiles = [];
    //   for (let i=0; i < files.length; i++) {
    //     const file = files[i];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     const readerPromise = new Promise<string>((resolve, reject) => {
    //       reader.onload = () => resolve(reader.result as string);
    //       reader.onload = () => reject(reader.error);
    //     });
    //     const dataURL = await readerPromise;
    //     const selectedFile: Selectedfile = { file, dataURL }
    //     this.selectedFiles.push(selectedFile);
    //   }
    // }
    // const formData = new FormData();
    // if ((event.target as HTMLInputElement).files![0] != null) {
    //   const reee = await Array.prototype.forEach.call(files, file => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     this.selectedFiles.push(file);
    //   })
    //   return this.userService.uploadFileToUser(this.accountFileUploadForm.getRawValue());
    // }
  }

  settingsInfo() {
    this.dialog.open(UserInfoComponent, {
      width: '40%',
      height: '70%',
      maxWidth: '500px',
    })
  }

  settingsSecurity() {

  }

  settingsSetDownloadDestination() {

  }

  settingsPolicies() {
    
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('');
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
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'viewMessages'}});
  }

  goToComposeMessage(): void {
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'sendMessage'}});
  }
  
  goToSendFile(): void {
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'sendFile'}});
  }
  
  goToStarredMessages(): void {
    this.router.navigateByUrl('account/messages', {state: {visitedFrom: 'Account', selection: 'viewStarredMessages'}});
  }

  goToCommunications(): void {
    this.router.navigateByUrl('communications', {state: {selection: 'viewMessages'}})
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
