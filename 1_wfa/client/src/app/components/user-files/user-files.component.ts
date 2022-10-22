import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';
import { File } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { UserUploadfileComponent } from '../user-uploadfile/user-uploadfile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styleUrls: ['./user-files.component.scss']
})
export class UserFilesComponent implements OnInit, AfterViewInit {
  // display selections
  home = false;
  uploads = false;
  downloads = false;

  // sets
  userUploads: File[] = [];
  userDownloads: File[] = [];
  userStarred: File[] = [];

  // display effects
  uploadsDiv!: HTMLElement | null;

  constructor(private router: Router, private metricsService: MetricsService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.check().then(userFound => {
      if (!userFound) this.router.navigateByUrl('account');
    })
    if (history.state.selection == 'uploads') this.selectionUploads();
    if (history.state.selection == 'downloads') this.selectionDownloads();
    if (history.state.selection == 'home') this.selectionHome();
    if (!history.state.selection) this.home = true;
    this.userService.fetchFiles().then(files => {
      console.log('files fetched = ', files);
    })
  }

  ngAfterViewInit(): void {
    this.uploadsDiv = document.getElementById('uploads');
    this.uploadsDiv?.addEventListener('click', () => {
      console.log('you clicked on upload div. removing CLASS pre-expand. adding CLASS post-expand. ');
      this.uploadsDiv?.classList.remove('pre-expand');
      this.uploadsDiv?.classList.add('post-expand');
    })
  }

  selectionUploads(): void {
    this.uploads = true;
    console.log('selected uploads');
    setTimeout(() => {
      const uploadsDiv = document.getElementById('uploads');
      uploadsDiv?.classList.remove('pre-expand');
      uploadsDiv?.classList.add('post-expand');
    }, 5);
    this.uploads = true;
    this.downloads = false;
    this.home = false;
  }

  selectionDownloads(): void {
    this.downloads = true;
    console.log('selected downloads');
    setTimeout(() => {
      const downloadsDiv = document.getElementById('downloads');
      downloadsDiv?.classList.remove('pre-expand');
      downloadsDiv?.classList.add('post-expand');
    }, 5);
    this.downloads = true;
    this.uploads = false;
    this.home = false;
  }

  selectionHome(): void {
    this.home = true;
    this.downloads = false;
    this.uploads = false;
    console.log('selected home');
    
    this.home = true;
    this.downloads = false;
    this.uploads = false;
  }

  uploadModal() {
    const dialogRef = this.dialog.open(UserUploadfileComponent, { 
      width: '85%',
      maxWidth: '750px',
      height: '300px', 
      autoFocus: true,
    }).afterClosed().subscribe(file => {
      console.log('afterClosed() - file uploading: ', file);
      this.refreshFiles();
    })
  }

  refreshFiles() {
    this.userService.fetchFiles().then(files => {
      console.log('refreshed file list: ', files);
      this.uploads = files.uploads;
    })
  }

}
