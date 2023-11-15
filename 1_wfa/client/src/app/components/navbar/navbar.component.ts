import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: User;
  userLoggedIn!: boolean; // <-- hamburger vs account boolean
  metricHeader = 'Landing';

  constructor(private router: Router, private dialog: MatDialog, private userService: UserService, private windowService: WindowService, private metricsService: MetricsService) { }

  ngOnInit(): void {
    this.userService.check()
      .then(checkResult => {
        console.log('checkResult = ', checkResult);
        this.userLoggedIn = checkResult;
      })
      .catch(err => {
        console.log(err); 
        return err;
      });
    this.userService.loggedIn.subscribe(data => {
      this.userLoggedIn = data;
    });
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
    
  }
  
  userCheck(): void {
    this.userService.check()
      .then(user => {
        console.log('user: ', user);
        if (user == false) return;
        this.user = user;
        this.userLoggedIn = true;
      })
  }

  // hamburger button
  signIn(): void {
     const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '280px',
      autoFocus: true,
      panelClass: 'mat-dialog-height-transition'
     }).afterClosed().toPromise()
      .then(resultAfterClosed => {
        console.log('result after closing signIn()', resultAfterClosed);
        
      })
      .catch(err => {
        console.log('error with signIn()', err);
        
      })
  }

  account() {
    this.router.navigateByUrl('account', {state: {navigatedFrom: `${this.metricHeader}`}});
    // this.windowService.bgImageMarginLeft.next(-600);
  }

  home() {
    this.router.navigateByUrl('');
    // this.windowService.bgImageWidth.next(4000);
  }

  goToAdmin() {
    this.router.navigateByUrl('admin', {state: {navigatedFrom: `${this.metricHeader}`}});
  }

  logout() {
    this.userService.logout()
      .then(() => { this.router.navigateByUrl(''); this.userLoggedIn = false; })
      .catch(err => console.log(err));
  }

}
