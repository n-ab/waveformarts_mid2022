import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';

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

  constructor(private router: Router, private fileService: FileService, private metricsService: MetricsService, private projectService: ProjectService) {
    this.uploadForm = new FormGroup({
      companyProject: new FormControl(''),
      email: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      audioFile: new FormControl(null, Validators.required),
    })
  }
  
  ngOnInit(): void {
    this.metricsService.addPageMetrics(this.metricsHeader, history.state.navigatedFrom);
  }
  
  ngAfterViewInit(): void {
    this.description = document.getElementById('description');
    document.getElementById('upload')?.classList.add('invalid');
  }

  onChange(change: any) {
    console.log('change', change);
    this.formCheck();
  }

  soundSelected(event: Event): void {
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
    this.selectedFiles.forEach((file, i) => { formData.append('files', this.selectedFiles[i]); });
    formData.append('companyProject', this.uploadForm.get('companyProject')!.value);
    formData.append('email', this.uploadForm.get('email')!.value);
    formData.append('description', this.uploadForm.get('description')!.value);
    // attempt 2
    this.projectService.startProject(formData);


    // STEP 1
    // this.fileService.prepareDestinationFolder({destinationFolder: this.uploadForm.get('companyProject')!.value})
      // .then(() => {
    // STEP 2
        // this.fileService.uploadFile(formData);
      // })
  }

  formCheck(): void {
    if (this.uploadForm.valid) { document.getElementById('upload')?.classList.remove('invalid'); }
    if (!this.uploadForm.valid) { document.getElementById('upload')?.classList.add('invalid'); }
  }


}
