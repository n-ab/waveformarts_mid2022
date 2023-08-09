import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

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
    console.log('this.showLoginWithProjectId = ', this.showLoginWithProjectId);
    console.log('this.showLoginWithUsernamePassword', this.showLoginWithUsernamePassword);
    if (this.showLoginWithProjectId == true) {
      console.log('PROJECT NAME / NUMBER SIGN IN ');
      const project = await this.projectService.logInToProject(this.loginWithProjectNameForm.getRawValue());
      console.log('signed into project: ', project);
      return project;
    };
    if (this.showLoginWithUsernamePassword == true) {
      console.log('USERNAME / PASSWORD SIGN IN ');
      const user = await this.userService.login(this.loginWithUsernamePasswordForm.getRawValue());
      if (user == 'Your password is incorrect.' || 'No trace of that user exists.') { this.error = true; this.errorMessage = user; this.dialogRef.updateSize('450px', '300px');}
      console.log('user signed in: ', user);
      return user;
    }
    // console.log('login() - userLoggedIn = ', userLoggedIn);
    // if (userLoggedIn == 'Your password is incorrect.')  { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return;}
    // if (userLoggedIn == 'No trace of that user exists.') { this.error = true; this.errorMessage = 'User not found.'; this.adjustSizeAfterError(); return; }
    // if (userLoggedIn == 'Actually try to insert a username and password.') { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return; }
    // this.dialogRef.close(userLoggedIn);
  }

  async register() {
    const userRegistered = await this.userService.register(this.registerForm.getRawValue());
    console.log('typeof userRegistered = ', typeof userRegistered);
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
