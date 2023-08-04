import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  metricHeader = 'Login';
  returnedUser!: any;

  // error handling ------------------
  error = false;
  errorMessage = ' ';

  // forms ----------------------------
  loginWithUsernamePassword: FormGroup;
  loginWithProjectNameForm: FormGroup;
  registerForm: FormGroup;

  // show options ---------------------
  showMenuOptions = true;
  showLoginOptions = false;

  // show forms ---------------------
  showLoginWithUsernamePasswordForm = false;
  showLoginWithProjectIdForm = false;
  showRegisterForm = false;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<LoginComponent>, private metricsService: MetricsService, private router: Router) {
    this.loginWithUsernamePassword = new FormGroup({
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
    // const userLoggedIn: object | string = await this.userService.login(this.loginForm.getRawValue());
    // console.log('login() - userLoggedIn = ', userLoggedIn);
    // if (userLoggedIn == 'Your password is incorrect.')  { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return;}
    // if (userLoggedIn == 'No trace of that user exists.') { this.error = true; this.errorMessage = 'User not found.'; this.adjustSizeAfterError(); return; }
    // if (userLoggedIn == 'Actually try to insert a username and password.') { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return; }
    // this.dialogRef.close(userLoggedIn);
  }

  async register() {
    const userRegistered = await this.userService.register(this.registerForm.getRawValue());
    console.log('userRegistered = ', userRegistered);
    this.returnedUser = userRegistered;
  }

  // ----------- Menu Selections ---------------

  async selectedLogin() {
    this.dialogRef.updateSize('450px', '215px').addPanelClass('mat-dialog-height-transition');
    this.showLoginOptions = true;
    this.showMenuOptions = false;
  }

  async selectedLoginWithUsername() {
    this.showLoginOptions = false;
    this.showLoginWithUsernamePasswordForm = true;
  }

  async selectedLoginWithProjectName() {
    this.showLoginOptions = false;
    this.showLoginWithProjectIdForm = true;
  }

  async selectedRegister() {
    this.showMenuOptions = false;
    this.dialogRef.updateSize('450px', '425px');
    this.showRegisterForm = true;
  }

  async selectedContact() {
    this.dialogRef.close();
    this.router.navigateByUrl('contact');
  }

  // ---------------------------------------------

  showRegister(): void {
    this.showRegisterForm = true;
    this.error = false;
    this.errorMessage = '';
    this.dialogRef.updateSize('90%', '570px');
  }

  showLogin(): void {
    this.showRegisterForm = false;
    this.dialogRef.updateSize('90%', '353px');
  }

  adjustSizeAfterError(): void {
    this.dialogRef.updateSize('96%', '389px');
  }

}
