import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.scss']
})
export class UserQuestionComponent implements OnInit {

  questionForm!: FormGroup;
  imagePreview = '';

  constructor(private userService: UserService, public dialogRef: MatDialogRef<UserQuestionComponent>) {
    this.questionForm = new FormGroup({
      question: new FormControl('', [Validators.minLength(10), Validators.required]),
      additionalInfo: new FormControl(''),
      image: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.userService.check().then(user => { if (!user) this.dialogRef.close() })
  }

  uploadQuestion() {
    this.userService.askQuestion(this.questionForm.getRawValue())
    .then(questionId => console.log('question saved: ', questionId));
  }

  imageSelected(event: Event): void {
    if ((event.target as HTMLInputElement).files![0] != null) {
      // tslint:disable-next-line:no-non-null-assertion
      const file = (event.target as HTMLInputElement).files![0];
      this.questionForm.patchValue({audioFile: file});
      console.log('file = ', file);
      // tslint:disable-next-line:no-non-null-assertion
      this.questionForm.get('image')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        // tslint:disable-next-line:no-non-null-assertion
        this.imagePreview = reader.result!.toString();
      };
      this.dialogRef.updateSize('75%', '493px');
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

}
