import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Admin, Page } from 'src/app/models';
import { User } from '../../models';
import { AdminService } from 'src/app/services/admin.service';
import { WindowService } from 'src/app/services/window.service';
import { MetricsService } from 'src/app/services/metrics.service';

export interface adjustedUser {
  this: ''
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  metricHeader = 'Admin';
  // --- form groups -----------
  adminForm!: FormGroup;
  addPageForm!: FormGroup;
  addUserForm!: FormGroup;
  userLookupForm!: FormGroup;

  // --- model refs -----------
  userFound!: User;
  admin!: string;
  pages!: Page[];
  users!: User[]; // this is the entire user array, unfiltered after http fetch
  adjustedUsers: adjustedUser[] = [];
  
  // --- booleans -----------
  adminLoggedIn = false;
  metricsLoadComplete = false;
  showFullUserList = true;
  showFilteredUserList = false;
  metricsFound = false;

  // --- query sets -----------
  validSearchEntries: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];
  searchQueryArray: string[] = [];
  newUserListQueue: User[] = [];
  newUserList: User[] = [];

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
      projects: new FormControl('', null), 
      clientNumber: new FormControl('', null), 
      status: new FormControl('', null), 
      role: new FormControl('', null), 
    });
    this.userLookupForm = new FormGroup({
      lookUpByName: new FormControl(''),
      lookUpByEmail: new FormControl(''),
      lookUpByCompany: new FormControl(''),
      lookUpByProject: new FormControl(''),
      lookUpById: new FormControl(''),
    })
    // this.addAdminForm = new FormGroup({
    //   username: new FormControl('', null), 
    //   password: new FormControl('', null),
    //   counter: new FormControl(0)
    // })


  }

  ngOnInit(): void {
    this.windowService.bgImageWidth.next(4300);
    this.windowService.bgImageMarginLeft.next(-1900);
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  ngAfterViewInit(): void {
      const userSearchBar = document.getElementById('name-search-input');
      console.log('user search bar', userSearchBar);
      
      userSearchBar?.addEventListener('keydown', event => {
        if (event.key === 'Backspace' || event.code === 'Backspace') { this.handleBackspace(); }
        if (this.validSearchEntries.includes(event.key)) { this.handleValidEntry(event.key) }
      });
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
        setTimeout(() => {
          this.prepNameSearchBarr();
        }, 100);
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
    this.compileUserList(metrics['users']);
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

  // A L L    S E A R C H    F U N C T I O N S 

  prepNameSearchBarr(): void {
    const searchBar = document.getElementById('name-search-input');
    searchBar?.addEventListener('keydown', event => {
      if (event.key === 'Backspace' || event.code === 'Backspace') {  this.handleBackspace(); } // user hit backspace
      if (this.validSearchEntries.includes(event.key)) {              this.handleValidEntry(event.key); }// user made valid entry
    });
  }
  
  handleValidEntry(eventKey: string): void {
    if (this.searchQueryArray.length === 0) {
      this.searchQueryArray.push(eventKey);
      this.mapSounds();
    } else {
      this.searchQueryArray[0] += eventKey;
      this.mapSounds();
    }
  }
  
  mapSounds(): void {
    this.users.map((user, index) => { if (this.testRegex(user)) { this.putUserInQueue(user); } });
    this.newUserList.length = 0;
    this.newUserList.push(...this.newUserListQueue);
    this.newUserListQueue.length = 0;
    this.showFullUserList = false;
    this.showFilteredUserList = true;
  }
  
  testRegex(user: User): boolean {
    // the 'i' flag makes the regex case insensitive
    if (RegExp(`${this.searchQueryArray}`, 'i').test(user.fullName)) { return true; }
    return false;
  }
  
  putUserInQueue(user: User): void {
    this.newUserListQueue.push(user);
  }
  
  replaceSoundListWithQueue(): void {
    this.newUserList.length = 0;
    this.newUserList = this.newUserListQueue;
    this.showFullUserList = false;
    this.showFilteredUserList = true;
  }
  
  handleBackspace(): void {
    console.log('-- HANDLING BACKSPACE ...');
    console.log('this.searchQueryArray = ', this.searchQueryArray);
    this.searchQueryArray[0] = this.searchQueryArray[0].substr(0, this.searchQueryArray[0].length - 1);
    console.log('this.searchQueryArray = ', this.searchQueryArray);
    this.mapSounds();
  }
  
  async compileUserList(searchQuery: string): Promise<any> {
    const users = this.adminService.compileAllMetrics()
    this.users = Object.values(this.users);
    this.metricsFound = true;
    return this.users;
  }

}
