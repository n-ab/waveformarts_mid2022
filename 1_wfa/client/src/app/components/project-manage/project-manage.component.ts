import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectObject } from '../../../../../server/src/models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { UserObject } from '../../../../../server/src/models/user';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  project!: ProjectObject;
  user!: UserObject;
  audioFilePath!: string;

  // display booleans
  filesSelected = false;
  deliverablesSelected = true;
  communicationsSelected = false;

  // file renderers
  renderedFiles: any[] = [];
  audioFiles:    any[] = [];

  requestedFiles!: any[];
  uploadedFiles!: any[];
  
  // aaf/omf, mov
  sessionDataFile!: any;
  movieFile!: any;

  // stems
  dialogStem!: any;
  musicStem!: any;
  effectsStem!: any;
  ambienceStem!: any;
  
  selectedFiles: any[] = [];
  addFileForm: FormGroup;

  filePath = '';
  audioPreview = '';

  metricHeader = 'ProjectManage'

  constructor(private metricsService: MetricsService, private userService: UserService, private projectService: ProjectService, private router: Router, private fileService: FileService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.addFileForm = new FormGroup({
      audioFile: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.userService.check().then(user => {
      if (!user) return this.router.navigateByUrl('');
      return this.user = user;
    })
    this.route.params.subscribe(params => {
      const projectId = params['id']
      this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
      this.projectService.getProjectData(projectId)
        .then(project => {
          this.project = project;
          this.refreshFiles();
        })
        .catch(err => {
          console.log('ERROR getProjectData(history.state.id):', err);
          return err;
        });
    })
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

  removeFile(type: string) {
    this.fileService.removeFile(this.project._id, type)
      .then(fileList => {
        console.log('fileList after REMOVAL: ', fileList);
        return fileList;
      })
      .catch(err => err);
  }

  onFileChange(event: any, fileType: string): void {
    const fileList: FileList = event.target.files;
    const title = this.project.title;
    this.fileService.prepareDestinationFolder({title, fileType})
      .then(directory => {
        console.log('directory created: ', directory);
        if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData = new FormData();
          formData.append('fileType', fileType);
          formData.append('companyProject', this.project.title);
          formData.append('_id', this.project._id);
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
    this.fileService.refreshFiles(this.project._id)
      .then(files => {
        const project = this.project.title.toUpperCase();
        const unsortedAudioFiles = files.map((file: any) => {
          const regex = '(?:[^/]+/){2}(.+)';
          const match = file.filePath.match(regex);
          switch (file.fileType) {
            case 'dialog':   this.dialogStem = match[1];      this.audioFiles.push({fileName: match[1], file}); break;
            case 'music':    this.musicStem = match[1];       this.audioFiles.push({fileName: match[1], file}); break;
            case 'effects':  this.effectsStem = match[1];     this.audioFiles.push({fileName: match[1], file}); break;
            case 'ambience': this.ambienceStem = match[1];    this.audioFiles.push({fileName: match[1], file}); break;
            case 'aaf':      this.sessionDataFile = match[1]; this.audioFiles.push({fileName: match[1], file}); break;
            case 'movie':    this.movieFile = match[1];       this.audioFiles.push({fileName: match[1], file}); break;
            default: break;
          }
          // this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:8000/audioFiles/${file}`);
        });
        console.log(`${project}, ${files.length} files`);
      })
      .catch(err => err);
  }

  async download(event: any) {
    return;
  }

  async listen(event: any) {
    console.log('project-manage - listen event: ', event);
    const url = `http://localhost:8000/audioFiles/${this.project.title}/${event}`;
    this.audioFilePath = url;
  }
}
