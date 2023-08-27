import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user!: User;
  userInfoForm: FormGroup;

  changeFirstName = false;
  changeLastName = false;
  changePassword = false;
  changeEmail = false;
  changeUsername = false;
  changeCompany = false;

  constructor(private userService: UserService, ) {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl(null),
      lastName:  new FormControl(null),
      password: new FormControl(null),
      email: new FormControl(null),
      username:  new FormControl(null),
      company: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.userService.check()
      .then(user => {
        this.user = user;
      })
      .catch(err => err);
  }

  selected(selection: string) {
    switch (selection) {
      case 'firstName':
        this.changeFirstName = true;
        break;
      case 'lastName':
        this.changeLastName = true;
        console.log('hey chloe lmao');
        break;
    }
  }

}
