import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectObject } from '../../../../../server/src/models/project';
import { Router } from '@angular/router';
import { User } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface TrimmedUserObject {
  id: string,
  email: string,
  pending: boolean,
}

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  project!: ProjectObject;
  filePath = '';
  team: User[] = [];

  showUserForm = false;
  addUserForm: FormGroup;

  selectedFiles: File[] = [];
  showFileForm = false;
  addFileForm: FormGroup;

  showDiscussionForm = false;
  addDiscussionForm: FormGroup;

  showMessageEngineerForm = false;
  messageEngineerForm: FormGroup;

  trimmedTeamMembers: TrimmedUserObject[] = [];

  audioPreview = '';

  metricHeader = 'ProjectManage'

  constructor(private metricsService: MetricsService, private projectService: ProjectService, private router: Router) {
    this.addUserForm = new FormGroup({
      email: new FormControl(''),
      wfaUserId: new FormControl('')
    });
    this.addFileForm = new FormGroup({
      audioFile: new FormControl(null, Validators.required),
    });
    this.addDiscussionForm = new FormGroup({
      recipients: new FormControl('', Validators.required),
      message: new FormControl(''),
    });
    this.messageEngineerForm = new FormGroup({
      message: new FormControl('')
    })
  }

  ngOnInit(): void {
    console.log('history.state.id', history.state.id);
    if (!history.state.id) { this.router.navigateByUrl('account'); }
    if (history.state.id == undefined) { this.router.navigateByUrl('account'); }
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
    this.projectService.getProjectData(history.state.id)
      .then(project => {
        console.log('$$$ project returned from project-manage: ', project);
        this.project = project;
        this.repopulateTeamMembers();
      })
      .catch(err => {
        console.log('ERROR getProjectData(history.state.id):', err);
        return err;
      });
  }

  showAddToTeam() {
    this.hideAllForms();
    this.showUserForm = true;
  }

  showStartDiscussion() {
    this.hideAllForms();
    this.showDiscussionForm = true;
  }

  showMessageEngineer() {
    this.hideAllForms();
    this.showMessageEngineerForm = true;
  }

  hideAllForms() {
    this.showUserForm = false;
    this.showFileForm = false;
    this.showDiscussionForm = false;
    this.showMessageEngineerForm = false;
  }

  soundSelected(event: Event): void {
    if ((event.target as HTMLInputElement).files![0] != null) {
      // tslint:disable-next-line:no-non-null-assertion
      const files = (event.target as HTMLInputElement).files!;
      this.addFileForm.patchValue({audio: files});
      // tslint:disable-next-line:no-non-null-assertion
      this.addFileForm.get('audioFile')!.updateValueAndValidity();
      Array.prototype.forEach.call(files, file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.selectedFiles.push(file);
      })
    }
  }

  addToTeam() {
    this.projectService.addUserToProject(this.addUserForm.getRawValue(), history.state.id)
      .then(projectUsers => {
        this.repopulateTeamMembers();
      })
      .catch(err => err);
  }

  repopulateTeamMembers() {
    console.log('history.state: ', history.state);
    this.projectService.repopulateTeamMembers(history.state.id)
      .then(updatedTeamMemberArray => {
        this.trimmedTeamMembers = updatedTeamMemberArray;
        console.log('trimmedTeamMembers: ', this.trimmedTeamMembers);
        return updatedTeamMemberArray;
      })
      .catch(err => console.log('error repopulating team members: ', err));
  }

  removeFromTeam(id: string) {
    this.projectService.removeFromTeam(id, history.state.id)
      .then(() => {
        return;
      })
  }

  addFileToProject() {
    this.projectService.addFileToProject(this.addFileForm.getRawValue())
    .then(projectFiles => {
      this.project.filePaths = projectFiles;
      console.log('projectFiles = ', projectFiles);
    })
    .catch(err => err);
  }

  startADiscussion() {
    this.projectService.startADiscussion(this.addDiscussionForm.getRawValue())
    .then(projectDiscussions => {
      console.log('projectDiscussions = ', projectDiscussions);

      this.project.discussions = projectDiscussions;
    })
    .catch(err => err);
  }

  messageYourEngineer() {
    this.projectService.messageEngineer(this.messageEngineerForm.getRawValue())
    .then(projectMessages => {
      console.log('projectMessages = ', projectMessages);
      this.project.messages = projectMessages;
    })
    .catch(err => err);
  }


}
