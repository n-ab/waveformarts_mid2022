import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: User;

  constructor(private router: Router, private dialog: MatDialog, private userService: UserService, private windowService: WindowService) { }

  ngOnInit(): void {
    this.userCheck();
  }

  userCheck(): void {
    this.userService.check()
      .then(user => {
        this.user = user;
      })
  }

  signIn(): void {
     const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '353px',
      autoFocus: true,
      panelClass: 'mat-dialog-container'
     }).afterClosed().subscribe(userSignedIn => {
      this.user = userSignedIn;
     })
  }

  account() {
    this.router.navigateByUrl('account');
    // this.windowService.bgImageMarginLeft.next(-600);
  }

  home() {
    this.router.navigateByUrl('');
    // this.windowService.bgImageWidth.next(4000);
  }

}
