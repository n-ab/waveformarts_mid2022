import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  metricHeader = 'Login';
  newRegisteredUser!: object | void;

  // error handling ------------------
  error = false;
  errorMessage = ' ';

  // forms ----------------------------
  loginWithUsernamePasswordForm: FormGroup;
  loginWithProjectNameForm: FormGroup;
  registerForm: FormGroup;

  // show options ---------------------
  showMenuOptions = true;
  showLoginOptions = false;

  // show forms ---------------------
  showLoginWithUsernamePassword = false;
  showLoginWithProjectId = false;
  showRegister = false;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<LoginComponent>, private metricsService: MetricsService, private router: Router, private projectService: ProjectService) {
    this.loginWithUsernamePasswordForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
    this.loginWithProjectNameForm = new FormGroup({
      projectName: new FormControl(null),
      projectNumber: new FormControl(null)
    });
    this.registerForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
      status: new FormControl(true),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      company: new FormControl(null),
    });

  }

  ngOnInit(): void {
    this.dialogRef.addPanelClass('mat-dialog-height-transition');
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
    this.dialogRef.updateSize('450px', '280px').addPanelClass('mat-dialog-height-transition');
  }

  ngAfterViewInit(): void {
    this.dialogRef.updateSize('450px', '280px').addPanelClass('mat-dialog-height-transition');
  }

  async login() {
    if (this.showLoginWithProjectId == true) {
      const project = await this.projectService.logInToProject(this.loginWithProjectNameForm.getRawValue());
      return project;
    };
    if (this.showLoginWithUsernamePassword == true) {
      const user = await this.userService.login(this.loginWithUsernamePasswordForm.getRawValue());
      // if success
      if (!user.error || !user.error.message) {
        console.log('login component user: ', user);
        this.router.navigateByUrl('account', {state: {'userId': user}});
        return this.dialogRef.close(user);
      }
      // if error
      if (user.error.message == 'Your password is incorrect.' || 'No trace of that user exists.') { this.error = true; this.errorMessage = user.error.message; this.dialogRef.updateSize('450px', '300px');}
    }
  }

  async register() {
    const userRegistered = await this.userService.register(this.registerForm.getRawValue());
    this.newRegisteredUser = userRegistered;
    this.showRegister = false;
    this.dialogRef.updateSize('450px', '215px').addPanelClass('mat-dialog-height-transition');
    this.showLoginWithUsernamePassword = true;
    this.showLoginWithProjectId = false;
    this.loginWithUsernamePasswordForm.patchValue({username: this.newRegisteredUser});
  }

  // ----------- Menu Selections ---------------

  async selectedLogin() {
    this.dialogRef.updateSize('450px', '215px').addPanelClass('mat-dialog-height-transition');
    this.showLoginOptions = true;
    this.showMenuOptions = false;
  }

  async selectedLoginWithUsername() {
    this.showLoginOptions = false;
    this.showLoginWithUsernamePassword = true;
  }

  async selectedLoginWithProjectName() {
    this.showLoginOptions = false;
    this.showLoginWithProjectId = true;
  }

  async selectedRegister() {
    this.showMenuOptions = false;
    this.dialogRef.updateSize('450px', '425px');
    this.showRegister = true;
  }

  async selectedContact() {
    this.dialogRef.close();
    this.router.navigateByUrl('contact');
  }

  // ---------------------------------------------
  
  showLogin(): void {
    this.showRegister = false;
    this.dialogRef.updateSize('90%', '353px');
  }

  adjustSizeAfterError(): void {
    this.dialogRef.updateSize('96%', '389px');
  }

}
