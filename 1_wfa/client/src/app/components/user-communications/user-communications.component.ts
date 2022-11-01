import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Discussion, Message, Project, User } from 'src/app/models';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
import { StartProjectComponent } from '../start-project/start-project.component';

@Component({
  selector: 'app-user-communications',
  templateUrl: './user-communications.component.html',
  styleUrls: ['./user-communications.component.scss']
})
export class UserCommunicationsComponent implements OnInit, AfterViewInit {

  user!: User;
  messages: Message[] = [];

  // display selections
  viewMessages = false;
  sendMessage = false;
  sendFile = false;
  viewStarredMessages = false;

  // sets
  userMessages: Message[] = [];
  userDiscussions: Discussion[] = [];
  userProjects: Project[] = [];

  // conditionals
  userMessagesHaveBeenDownloaded = false;

  // forms 
  sendMessageForm!: FormGroup;
  

  constructor(private router: Router, private metricsService: MetricsService, private userService: UserService, private windowService: WindowService, public dialog: MatDialog) {
    this.sendMessageForm = new FormGroup({
      content: new FormControl(''),
      taggedUsers: new FormControl([])
    })
  }

  ngOnInit(): void {
    this.userService.check().then(user => {
      if (!user) {
        this.router.navigateByUrl('');
      } else {
        this.fetchPopulatedUserData();
      }
    });
    this.windowService.bgImageMarginLeft.next(-1050);
    this.windowService.bgImageWidth.next(3200);
    console.log(history.state.selection);
    if (history.state.selection == 'viewMessages') this.selectMessages();
    if (history.state.selection == 'sendMessage') this.selectSendMessage();
    if (history.state.selection == 'sendFile') this.selectSendFile();
    if (history.state.selection == 'viewStarredMessages') this.selectStarredMessages();
  }

  ngAfterViewInit(): void {

  }

  selectMessages(): void {
    this.viewMessages = true;
    this.sendMessage = false;
    this.sendFile = false;
    this.viewStarredMessages = false;
  }

  selectSendMessage(): void {
    this.sendMessage = true;
    this.viewMessages = false;
    this.sendFile = false;
    this.viewStarredMessages = false;
  }

  selectSendFile(): void {
    this.sendFile = true;
    this.sendMessage = false;
    this.viewStarredMessages = false;
    this.viewMessages = false;
  }

  selectStarredMessages(): void {
    this.viewStarredMessages = true;
    this.sendFile = false;
    this.viewMessages = false;
    this.sendMessage = false;
  }

  fetchPopulatedUserData(): void {
    this.userService.fetchPopulatedUserData()
      .then(messages => {
        console.log('users messages = ', messages);
        this.messages = messages;
      });
  }

  setMessages(messages: any): void {
    this.messages = messages;
    console.log('this.messages = ', this.messages);
    
  }

  sortPinnedMessages(messages: any): void {
    
  }

  submitMessage(): void {
    this.userService.submitMessage(this.sendMessageForm.getRawValue());
  }

  startNewProject(): void {
    this.windowService.bgImageMarginTop.next(1000);
    this.dialog.open(StartProjectComponent, {
      width: '60%',
      maxWidth: '700px',
      height: '345px',
      data: 'start'
    })
  }

  joinProject(): void {
    this.dialog.open(StartProjectComponent, {
      width: '60%',
      maxWidth: '700px',
      height: '345px',
      data: 'join'
    });
  }

}
