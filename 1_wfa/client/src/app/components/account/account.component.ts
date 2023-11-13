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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { fileTypeValidator } from 'src/app/customFileValidator';

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
  filteredProjects: Project[] = [];
  titlesToTestAgainst: string[] = [];

  userSounds: File[] = [];
  fileUploadForm!: FormGroup;
  
  selectedFiles: File[] = [];
  showSelectedFiles = false;

  constructor(private router: Router, private windowService: WindowService, private metricsService: MetricsService, private userService: UserService, private dialog: MatDialog, private projectService: ProjectService) {
    this.fileUploadForm = new FormGroup({
      audioFile: new FormControl(null, [Validators.required, fileTypeValidator(['.wav', '.mp3'])])
    })
  }

  ngOnInit(): void {
    this.userService.check()
      .then (user => {
        console.log('userFound: ', user);
        if (user == false) { this.router.navigateByUrl(''); } 
        else {
          this.user = user;
          this.userProjects = user.projects;
          this.fetchProjects(user.projects);
        }
      })
    this.windowService.bgImageMarginLeft.next(-225);
    this.windowService.bgImageWidth.next(2400);
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  startProject() {
    this.dialog.open(StartProjectComponent, {
      width: '400px',
      height: '450px',
      maxWidth: '700px'
    })
  }

  joinProject() {
    this.dialog.open(JoinprojectComponent, {
      width: '400px',
      height: '220px',
      autoFocus: true,
      data: this.user._id
    });
  }
  

  async uploadFile(event: Event) {
    console.log('1', event);
    if ((event.target as HTMLInputElement).files![0] != null) {
      const files = (event.target as HTMLInputElement).files!;
      console.log('2', files);
      // === method 1 ================
      const fileList = Array.from(files).map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log('3', file);
        this.selectedFiles.push(file);
        return file;
      });
    console.log('4', this.selectedFiles);
        this.userService.uploadFileToUser(fileList);
    }
  }

  
  fetchProjects(projectIds: string[]) {
    return this.projectService.fetchProjects(projectIds)
    .then(populatedProjects => {
      // putting titles in an array to make sure duplicates aren't entered.
      // this indicates a glaring issue that projects are saved twice.
      for (let i = 0; i < populatedProjects.length; i++) {
        this.titlesToTestAgainst.push(populatedProjects[i].title);
      }
      // if a title isn't in the array, put the entire project in the filteredProjects array.
      // your issue is here.
      for (let i = 0; i < populatedProjects.length; i++) {
        console.log(`${populatedProjects[i].title}` + ' ? == ? ' + this.titlesToTestAgainst[0]);
        if (populatedProjects[i].title !== this.titlesToTestAgainst[0]) {
          this.filteredProjects.push(populatedProjects[i].title);
          console.log('1 this.filteredProjects: ', this.filteredProjects);
        } else {
          this.filteredProjects.push(populatedProjects[i]);
          console.log('2 this.filteredProjects: ', this.filteredProjects);
          return;
        }
      }
    })
  }

  putProjectTitlesInArray(stuff: any[]) {
    for (let i = 0; i < stuff.length; i++) {
      const element = stuff[i];
      
    }
  }

  goToProject(event: any) {
    this.router.navigateByUrl('project', {state: {id: event}});
  }
  
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('');
  }
  
  // R O U T I N G --- M E N U     O P T I O N S
  
  settingsInfo() {
    this.dialog.open(UserInfoComponent, {
      width: '40%',
      height: '70%',
      maxWidth: '500px',
    })
  }

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
