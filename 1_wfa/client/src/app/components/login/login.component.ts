import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error = false;
  errorMessage = ' ';
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerSuccess = false;
  showRegisterForm = false;
  metricHeader = 'Login';

  constructor(private userService: UserService, public dialogRef: MatDialogRef<LoginComponent>, private metricsService: MetricsService) {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
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
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  async login() {
    const userLoggedIn: object | string = await this.userService.login(this.loginForm.getRawValue());
    console.log('login() - userLoggedIn = ', userLoggedIn);
    if (userLoggedIn == 'Your password is incorrect.')  { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return;}
    if (userLoggedIn == 'No trace of that user exists.') { this.error = true; this.errorMessage = 'User not found.'; this.adjustSizeAfterError(); return; }
    if (userLoggedIn == 'Actually try to insert a username and password.') { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return; }
    this.dialogRef.close(userLoggedIn);
  }

  async register() {
    const userRegistered = await this.userService.register(this.registerForm.getRawValue());
    console.log('userRegistered = ', userRegistered);
    if (userRegistered) {
      this.registerSuccess = true;
      this.showLogin();
      this.loginForm.patchValue({username: userRegistered[2]})
    }
  }

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
