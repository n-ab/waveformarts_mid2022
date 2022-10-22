import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-uploadfile',
  templateUrl: './user-uploadfile.component.html',
  styleUrls: ['./user-uploadfile.component.scss']
})
export class UserUploadfileComponent implements OnInit {
  
  metricsHeader = 'User Upload File Modal'

  uploadForm!: FormGroup;
  user!: User;
  file!: File;
  fileUploaded = false;

  audioPreview = '';

  constructor(private userService: UserService, public dialogRef: MatDialogRef<UserUploadfileComponent>, private fileService: FileService) {
    this.uploadForm = new FormGroup({
      title: new FormControl(''),
      project: new FormControl(''),
      audioFile: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.userService.check().then(user => this.user = user);
  }

  upload() {
    console.log('uploading file: ', this.uploadForm);
    return this.fileService.uploadFile(this.uploadForm.getRawValue()).then(() => this.dialogRef.close());
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
        this.fileUploaded = true;
        this.dialogRef.updateSize('85%', '400px');
        this.file = file;
        // const source = this.audioContext.createBufferSource().context;
        // console.log('this.audioContext.createBufferSource().context: ', source);
      }
    }
  }

}
