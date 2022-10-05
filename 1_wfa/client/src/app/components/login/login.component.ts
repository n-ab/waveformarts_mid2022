import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private userService: UserService, public dialogRef: MatDialogRef<LoginComponent>) {
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
  }

  async login() {
    const userLoggedIn = await this.userService.login(this.loginForm.getRawValue());
    if (userLoggedIn == 'Incorrect password SON.')  { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return;}
    if (userLoggedIn == 'USER DOESN\'T EXIST SON.') { this.error = true; this.errorMessage = 'User not found.'; this.adjustSizeAfterError(); return; }
    if (userLoggedIn == 'Missing credentials') { this.error = true; this.errorMessage = 'Incorrect Password'; this.adjustSizeAfterError(); return; }
    console.log('user logged in successfully: ', userLoggedIn);
    
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
    this.dialogRef.updateSize('96%', '350px');
  }

}
