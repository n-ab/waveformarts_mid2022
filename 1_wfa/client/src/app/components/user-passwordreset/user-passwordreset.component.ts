import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-passwordreset',
  templateUrl: './user-passwordreset.component.html',
  styleUrls: ['./user-passwordreset.component.scss']
})
export class UserPasswordresetComponent implements OnInit {

  changePasswordForm!: FormGroup;
  user!: User;

  constructor(public dialogRef: MatDialogRef<UserPasswordresetComponent>, private userService: UserService) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  changePassword() {
    this.userService.check().then(user => this.user = user)
      .then(() => {
        console.log('user login confirmed. updating password...');
        this.userService.changePassword(this.changePasswordForm.getRawValue())
          .then(() => {
            this.dialogRef.close();
          })
      })
  }

}
