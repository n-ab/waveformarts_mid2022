import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminForm!: FormGroup;
  adminLoggedIn = false;

  constructor(private windowService: WindowService, private adminService: AdminService) {
    this.adminForm = new FormGroup({
      username: new FormControl('', null), 
      password: new FormControl('', null)
    })
  }

  ngOnInit(): void {
    this.windowService.bgImageWidth.next(2000);
  }

  submit(): void {
    this.adminService.login(this.adminForm.getRawValue())
      .then(result => {
        console.log('ADMIN login attempt result: ', result);
        
      })
  }

}
