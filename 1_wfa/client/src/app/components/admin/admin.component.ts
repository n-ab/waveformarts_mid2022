import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Admin, Page } from 'src/app/models';
import { User } from '../../models';
import { AdminService } from 'src/app/services/admin.service';
import { WindowService } from 'src/app/services/window.service';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  metricHeader = 'Admin';
  adminForm!: FormGroup;
  addPageForm!: FormGroup;
  addUserForm!: FormGroup;
  // addAdminForm!: FormGroup;
  adminLoggedIn = false;
  admin!: string;
  users!: User[];
  pages!: Page[];
  metricsLoadComplete = false;

  constructor(private windowService: WindowService, private adminService: AdminService, private metricsService: MetricsService) {
    this.adminForm = new FormGroup({
      username: new FormControl('', null), 
      password: new FormControl('', null)
    });
    this.addPageForm = new FormGroup({
      title: new FormControl('', null), 
      clicks: new FormControl(0), 
      userNavigatedHere: new FormControl(0), 
      userNavigatedAway: new FormControl(0), 
      averageTimeSpentOnPage: new FormControl(0)
    });
    this.addUserForm = new FormGroup({
      firstName: new FormControl('', null), 
      lastName: new FormControl('', null), 
      nameAbbreviation: new FormControl('', null), 
      password: new FormControl('', null), 
      email: new FormControl('', null), 
      username: new FormControl('', null), 
      company: new FormControl('', null), 
      project: new FormControl('', null), 
      clientNumber: new FormControl('', null), 
      status: new FormControl('', null), 
      role: new FormControl('', null), 
    });
    // this.addAdminForm = new FormGroup({
    //   username: new FormControl('', null), 
    //   password: new FormControl('', null),
    //   counter: new FormControl(0)
    // })


  }

  ngOnInit(): void {
    console.log(history.state.navigatedFrom);
    
    this.windowService.bgImageWidth.next(4300);
    this.windowService.bgImageMarginLeft.next(-2700);
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  login(): void {
    this.adminService.login(this.adminForm.getRawValue())
      .then(admin => {
        console.log('shit returned from login: ', admin);
        
        if (admin == false) return;
        console.log('admin logged in. id: ', admin);
        this.admin = admin;
        this.adminLoggedIn = true;
        this.fetchMetrics();
      })
  }

  checkAdminToken() {
    this.adminService.checkAdminToken(this.admin).then(success => {
      if (success) {
        console.log('admin\'s token is still good: ', success);
        
      } else {
        console.log('i don\'t think the admin\'s token is still good mang.');
        
        this.adminLoggedIn = false;
      }
    })
  }

  async fetchMetrics() {
    const metrics = await this.adminService.compileAllMetrics();
    console.log('metrics found: ', metrics);
    this.setClients(metrics['users']);
    this.setPages(metrics['pages']);
  }

  setClients(userList: any) {
    this.users = userList;
  }

  setPages(pageList: any) {
    this.pages = pageList;
  }

  addPage() {
    console.log('adding a page...');
    
    return this.adminService.addPage(this.addPageForm.getRawValue());
  }
  // addAdmin(): void {
  //   console.log('ADDING ADMIN WITH DATA: ', this.adminForm.getRawValue());
  //   this.adminService.addAdmin(this.addAdminForm.getRawValue());
  // }

  addUser() {
    console.log('adding a user...');
    return this.adminService.addUser(this.addUserForm.getRawValue());
  }

}
