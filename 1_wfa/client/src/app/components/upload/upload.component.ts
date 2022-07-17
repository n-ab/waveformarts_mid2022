import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  audioPreview = '';

  constructor(private router: Router) {
    this.uploadForm = new FormGroup({
      title: new FormControl('', Validators.required),
      tasks:  new FormControl('', null),
      audioFile: new FormControl(null)
    })
  }

  ngOnInit(): void {
  }

  soundSelected(event: Event): void {
    if ((event.target as HTMLInputElement).files![0] != null) {
      const file = (event.target as HTMLInputElement).files![0];
      this.uploadForm.patchValue({audioFile: file});
      this.uploadForm.get('audioFile')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.audioPreview = reader.result!.toString();
      };
    }
  }

}
