import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectObject } from '../../../../../server/src/models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { UserService } from 'src/app/services/user.service';
import { UserObject } from '../../../../../server/src/models/user';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSlider } from '@angular/material/slider';

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

export interface TrimmedFileObject {
  filePath: string,
  data: {
    type: string,
    data: any[]
  }
}

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit, AfterViewInit {

  project!: ProjectObject;
  user!: UserObject;
  
  // audio handling
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('timeSlider') timeSlider!: MatSlider;
  @ViewChild('volumeSlider') volumeSlider!: MatSlider;
  audio!: HTMLAudioElement;
  duration!: number;
  currentTime = 0;
  audioPlaying = false;
  progress!: number;
  sliderValue = 0;
  mode: ProgressBarMode = 'determinate';
  volume = 20;
  playPause = 'play' || 'pause' ;
  color = 'primary';
  selectedAudio = '';
  audioControlPanel!: HTMLElement | null;
  showControlPanel = false;
  // new maybe unneeded shit related to 'audio handling'
  audioContext!: AudioContext; 
  analyser!: AnalyserNode;
  // javascriptNode!: ScriptProcessorNode; 
  analyserVolumeLevel = 0;

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
    // if (!history.state.id) { this.router.navigateByUrl('account'); }
    // if (history.state.id == undefined) { this.router.navigateByUrl('account'); }
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

  ngAfterViewInit(): void {
    if (this.timeSlider) {
      this.timeSlider.valueChange.subscribe(newValue => {
        console.log('time slider moved to new value: ', newValue);
        if (newValue !== null) {
          this.currentTime = newValue;
          this.progress = newValue;
        }
      })
    }
    if (this.volumeSlider) {
      this.volumeSlider.valueChange.subscribe(newVolume => {
        console.log('volume changed to ', newVolume);
        if (newVolume !== null) {
          this.volume = newVolume;
        } 
      })
    }
    this.audioControlPanel = document.getElementById('audio-controls');
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
          let projectTitle = this.project.title;
          let historyStateId = history.state.id;
          let fileName = file.name;
          const formData = new FormData();
          let deleteMe = {
            projectTitle,
            historyStateId,
            file,
            fileName,
            fileType
          };
          console.log('deleteMe: ', deleteMe);
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
          this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:8000/audioFiles/${file}`);
        });
        console.log(`${project}, ${files.length} files`);
        this.fetchFullFiles();
      })
      .catch(err => err);
  }

  async fetchFullFiles() {
    this.fileService.renderFullFiles(this.project._id)
      .then(files => {
        console.log('files: ', files);
        
        // this.blobify(files);
        this.renderedFiles = files;
     });
  }

  async download(event: any) {
    return;
  }

  async listen(event: any) {
    this.instantiateAudioPlayer(event);
    const url = `http://localhost:8000/audioFiles/${this.project.title}/${event}`;
    const audio = new Audio(url);
    this.audio = audio;
    this.selectedAudio = event;
    audio.addEventListener('canplay', (event) => {
      console.log('this.audio = ', this.audio);
      
      this.duration = this.audio.duration;
    });
    audio.addEventListener('timeupdate', (event) => {
      this.currentTime = this.audio.currentTime;
      this.progress = audio.currentTime / audio.duration;
    });
    this.audioPlaying = true;
    this.audio.currentTime = this.currentTime;
    this.audio.volume = this.volume / 100;
    audio.play();
    return;
  }

  updateVolume(newVolume: any ): void {
    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\');
    console.log('new volume - ', newVolume);
    
    const exponent = 4;
    const transformedVolume = Math.pow(newVolume, exponent);
    console.log('transformed volume - ', transformedVolume);
    this.volume = transformedVolume;
    this.audio.volume = transformedVolume;
    const actualVolume = Math.pow(transformedVolume, 1 / exponent);
    console.log('actual volume - ', actualVolume);
    this.volume = actualVolume;
    this.audio.volume = actualVolume;
    console.log('||||||||||||||');
  }

  updatePlaybackPosition(newPosition: any ): void {
    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\');
    console.log('new volume - ', newPosition);
    this.currentTime = newPosition;
    this.audio.currentTime = newPosition;
    console.log('this.audio.currentTime = ', this.audio.currentTime);
    console.log('this.currentTime = ', this.currentTime);
    
    console.log('||||||||||||||');
    
  }

  instantiateAudioPlayer(event: any) {
    console.log('this.audioControlPanel = ', this.audioControlPanel);
    console.log('getelementbyid event = ', document.getElementById(`${event}`));
    
    if (this.audioControlPanel) {
      const parent = document.getElementById(`${event}`)?.insertAdjacentElement('afterend', this.audioControlPanel);
    }
  }

  audioPlayPause(selection: string) {
    if (selection == 'play') { this.playPause = 'play'; return this.audio.play() }
    else { this.playPause = 'pause'; return this.audio.pause() }
  }

  audioStop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
