import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectObject } from '../../../../../server/src/models/project';
import { Router } from '@angular/router';
import { User } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface TrimmedUserObject {
  id: string,
  email: string,
  pending: boolean,
}

export interface TrimmedDiscussionObject {
  id: string,
  recentMessagePreview: string,
  thereIsRecentMessage: boolean
}

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  project!: ProjectObject;

  // display booleans
  filesSelected = true;
  deliverablesSelected = false;
  communicationsSelected = false;

  // file renderers
  sessionDataFile!: any;
  movieFile!: any;
  requestedFiles!: any[];
  uploadedFiles!: any[];
  audioFiles: SafeResourceUrl[] = [];

  // stem
  dialogStem!: any;
  musicStem!: any;
  effectsStem!: any;
  ambienceStem!: any;
  
  selectedFiles: any[] = [];
  addFileForm: FormGroup;

  filePath = '';
  audioPreview = '';

  metricHeader = 'ProjectManage'

  constructor(private metricsService: MetricsService, private projectService: ProjectService, private router: Router, private fileService: FileService, private sanitizer: DomSanitizer) {
    this.addFileForm = new FormGroup({
      audioFile: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if (!history.state.id) { this.router.navigateByUrl('account'); }
    if (history.state.id == undefined) { this.router.navigateByUrl('account'); }
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
    this.projectService.getProjectData(history.state.id)
      .then(project => {
        console.log('project returned: ', project.title);
        this.project = project;
        this.refreshFiles();
      })
      .catch(err => {
        console.log('ERROR getProjectData(history.state.id):', err);
        return err;
      });
  }
  
  displaySelection(selection: string) {
    switch (selection) {
      case 'files':
        this.filesSelected = true;
        this.deliverablesSelected = false;
        this.communicationsSelected = false;
        break;
      case 'deliverables':
        this.filesSelected = false;
        this.deliverablesSelected = true;
        this.communicationsSelected = false;
        break;
      case 'communications':
        this.filesSelected = false;
        this.deliverablesSelected = false;
        this.communicationsSelected = true;
        break;
    }
  }

  soundSelected(event: Event): void {
    if ((event.target as HTMLInputElement).files![0] != null) {
      // tslint:disable-next-line:no-non-null-assertion
      const files = (event.target as HTMLInputElement).files!;
      this.selectedFiles = [];
      // tslint:disable-next-line:no-non-null-assertion
      Array.prototype.forEach.call(files, file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({file, dataUrl: e.target.result});
        }
        reader.readAsDataURL(file);
        this.selectedFiles.push(file);
      });
      this.addFileForm.patchValue({audio: files});
      this.addFileForm.get('audioFile')!.updateValueAndValidity();
    }
  }

  addFileToProject() {
    this.projectService.addFileToProject(this.addFileForm.getRawValue())
    .then(projectFiles => {
      this.project.filePaths = projectFiles;
      console.log('projectFiles = ', projectFiles);
    })
    .catch(err => err);
  }

  onFileChange(event: any, filetype: string): void {
    const fileList: FileList = event.target.files;
    this.fileService.prepareDestinationFolder(this.project.title)
      .then(() => {
        if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData = new FormData();
          formData.append('companyProject', this.project.title);
          formData.append('_id', history.state.id);
          formData.append('files', file);
          formData.append('title', file.name);
          this.fileService.uploadFile(formData)
            .then(() => {
              this.refreshFiles();
            })
        }
      })
  }

  async refreshFiles() {
    this.fileService.refreshFiles(history.state.id)
      .then(files => {
        console.log('files fetched: ', files);
        this.audioFiles = files.map((file: any) => {
          console.log('line 152 - file: ', file);
          this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:8000/audioFiles/${file}`);
        })
      })
      .catch(err => err);
    // this.dialogStem = files.dialogStem;
    // this.musicStem = files.musicStem;
    // etc etc
  }
}
