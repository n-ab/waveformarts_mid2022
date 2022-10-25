import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-emailreset',
  templateUrl: './user-emailreset.component.html',
  styleUrls: ['./user-emailreset.component.scss']
})
export class UserEmailresetComponent implements OnInit {

  changeEmailForm!: FormGroup;
  user!: User;

  constructor(public dialogRef: MatDialogRef<UserEmailresetComponent>, private userService: UserService) {
    this.changeEmailForm = new FormGroup({
      oldEmail: new FormControl(''),
      newEmail: new FormControl(''),
      confirmNewEmail: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  changeEmail() {
    this.userService.check().then(user => this.user = user)
      .then(() => {
        console.log('user login confirmed. updating email...');
        this.userService.changeEmail(this.changeEmailForm.getRawValue())
        .then(() => {
          this.dialogRef.close();
        });
      })
  }

}
