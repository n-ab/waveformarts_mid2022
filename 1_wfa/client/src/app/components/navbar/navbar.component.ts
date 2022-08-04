import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: User;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  signIn(): void {
     const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '300px',
      autoFocus: true,
      panelClass: 'mat-dialog-container'
     })
  }

}
