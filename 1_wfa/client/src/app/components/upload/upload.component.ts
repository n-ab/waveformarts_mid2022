import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  audioPreview = '';

  constructor(private router: Router, private fileService: FileService) {
    this.uploadForm = new FormGroup({
      title: new FormControl('', Validators.required),
      clientsEmail: new FormControl('', null),
      tasks:  new FormControl('', null),
      audioFile: new FormControl(null)
    })
  }

  ngOnInit(): void {
    
  }

  soundSelected(event: Event): void {
    
    const reee = document.getElementById('lil-container');
    reee?.classList.add()
    if ((event.target as HTMLInputElement).files![0] != null) {
      // tslint:disable-next-line:no-non-null-assertion
      const file = (event.target as HTMLInputElement).files![0];
      this.uploadForm.patchValue({audioFile: file});
      console.log('file = ', file);
      // tslint:disable-next-line:no-non-null-assertion
      this.uploadForm.get('audioFile')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        // tslint:disable-next-line:no-non-null-assertion
        this.audioPreview = reader.result!.toString();
      };
      if (file) {
        reader.readAsDataURL(file);
        // const source = this.audioContext.createBufferSource().context;
        // console.log('this.audioContext.createBufferSource().context: ', source);
      }
    }
  }

  upload(): void {
    console.log('uploading file...');
    console.log(this.uploadForm);
    this.fileService.uploadFile(this.uploadForm.getRawValue());
    
  }

}
