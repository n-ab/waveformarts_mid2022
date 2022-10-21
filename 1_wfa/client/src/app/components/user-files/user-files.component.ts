import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';
import { File } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { UserUploadfileComponent } from '../user-uploadfile/user-uploadfile.component';

@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styleUrls: ['./user-files.component.scss']
})
export class UserFilesComponent implements OnInit {
  // display selections
  home = false;
  uploads = false;
  downloads = false;

  // sets
  userUploads: File[] = [];
  userDownloads: File[] = [];
  userStarred: File[] = [];

  constructor(private metricsService: MetricsService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (history.state.selection == 'uploads') this.uploads = true;
    if (history.state.selection == 'downloads') this.downloads = true;
    if (history.state.selection == 'home') this.home = true;
    if (!history.state.selection) this.home = true;
    this.userService.fetchFiles().then(files => {
      console.log('files fetched = ', files);
    })
  }

  selectionUploads(): void {
    console.log('selected uploads');
    document.getElementById('uploads')
    
    this.uploads = true;
    this.downloads = false;
    this.home = false;
  }

  selectionDownloads(): void {
    console.log('selected downloads');
    
    this.downloads = true;
    this.uploads = false;
    this.home = false;
  }

  selectionHome(): void {
    console.log('selected home');
    
    this.home = true;
    this.downloads = false;
    this.uploads = false;
  }

  uploadModal() {
    const dialogRef = this.dialog.open(UserUploadfileComponent, { 
      width: '400px',
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
