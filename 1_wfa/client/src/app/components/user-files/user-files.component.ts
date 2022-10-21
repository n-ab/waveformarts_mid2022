import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';
import { File } from '../../models';

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

  constructor(private metricsService: MetricsService, private userService: UserService) { }

  ngOnInit(): void {
    if (history.state.selection == 'uploads') this.uploads = true;
    if (history.state.selection == 'downloads') this.downloads = true;
    if (history.state.selection == 'home') this.home = true;
    this.userService.fetchFiles().then(files => {
      console.log('files fetched = ', files);
    })
  }

  selectionUploads(): void {
    console.log('selected uploads');
    
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

}
