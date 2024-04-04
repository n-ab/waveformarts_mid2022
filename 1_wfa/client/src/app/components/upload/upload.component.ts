import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { FileService } from 'src/app/services/file.service';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit {

  uploadForm: FormGroup;
  audioPreview = '';
  fileName!: string;
  metricsHeader = 'Upload';
  selectedFiles: File[] = [];
  description!: any;
  user!: User;

  constructor(private router: Router, private fileService: FileService, private metricsService: MetricsService, private projectService: ProjectService, private userService: UserService) {
    this.uploadForm = new FormGroup({
      companyProject: new FormControl(''),
      email: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      audioFile: new FormControl(null, Validators.required),
    })
  }
  
  ngOnInit(): void {
    this.metricsService.addPageMetrics(this.metricsHeader, history.state.navigatedFrom);
    this.userService.check()
      .then(user => {
        console.log('PRE EMAILCOMPANYPROJECT user returned: ', user);
        
        if (user == false) return;
        this.userService.fetchEmailCompanyProject()
          .then(user => {
            this.user = user;
          })
        return user;
      })
  }
  
  ngAfterViewInit(): void {
    this.description = document.getElementById('description');
    document.getElementById('upload')?.classList.add('invalid');
    // document.body.scrollTop = 0;
    const scrollOptions: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'start',
    }
    document.documentElement.scrollIntoView(scrollOptions);
  }

  onChange(change: any) {
    console.log('change', change);
    this.formCheck();
  }

  soundSelected(event: any): void {
    const title = this.uploadForm.get('companyProject');
    const fileTypes = '';
    const filesList = Array.from(event.target.files);
    console.log('filesList: ', filesList);
    
    if ((event.target as HTMLInputElement).files![0] != null) {
      // tslint:disable-next-line:no-non-null-assertion
      const files = (event.target as HTMLInputElement).files!;
      this.uploadForm.patchValue({audio: files});
      // tslint:disable-next-line:no-non-null-assertion
      this.uploadForm.get('audioFile')!.updateValueAndValidity();
      Array.prototype.forEach.call(files, file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.selectedFiles.push(file);
      })
    }
    this.formCheck();
    const fileList = document.querySelector('.file-list');
    setTimeout(() => {
      if (fileList) {
        const lastFile = fileList.lastElementChild;
        if (lastFile) {
          lastFile.scrollIntoView({behavior: 'smooth'});
        }
      }
    }, 400);
  }

  upload(): void {
    const formData = new FormData();
    // this.selectedFiles.forEach((file, i) => { formData.append('files', this.selectedFiles[i]); });
    // companyProject, email, description, audioFile
    // required properties: title = this.project.title, fileType: string
    // in this case, make fileType = 'projectWavs'
    const companyProject = this.uploadForm.get('companyProject')!.value;
    this.fileService.prepareDestinationFolder({title: companyProject, fileType: 'projectWavs'})
      .then(directory => {
        console.log('directory created: ', directory);
        if (this.selectedFiles.length > 0) {
          for (let i = 0; i < this.selectedFiles.length; i++) {
            const file: File = this.selectedFiles[i]; 
            const fileObject = { file: file, name: file.name};
            formData.append('files[]', JSON.stringify(fileObject));
          }
          formData.append('companyProject', this.uploadForm.get('companyProject')!.value);
          formData.append('email', this.uploadForm.get('email')!.value);
          formData.append('description', this.uploadForm.get('description')!.value);
          this.projectService.startProject(formData);
          this.fileService.uploadFile(formData)
            .then(() => {
              this.router.navigateByUrl('')
            })
        }
      })
  }

  formCheck(): void {
    if (this.uploadForm.valid) { document.getElementById('upload')?.classList.remove('invalid'); }
    if (!this.uploadForm.valid) { document.getElementById('upload')?.classList.add('invalid'); }
  }
}

// test project description
// Hello, What we need is basic dialog editing on a 60 to 70 minute long piece. There was a loud hum from one of the mics but our sound guy didn't record ISOs so we have the hum throughout all of our audio. It was a panel between three speakers and a host, all on lav with handheld mics for the speakers. Let us know how much time and cost would be required for you to work on this. Thanks, Nick