import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion, Message, User } from 'src/app/models';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-communications',
  templateUrl: './user-communications.component.html',
  styleUrls: ['./user-communications.component.scss']
})
export class UserCommunicationsComponent implements OnInit, AfterViewInit {

  user!: User;

  // display selections
  viewMessages = false;
  sendMessage = false;
  sendFile = false;
  viewStarredMessages = false;

  // sets
  userMessages: Message[] = [];
  userDiscussions: Discussion[] = [];

  constructor(private router: Router, private metricsService: MetricsService, private userService: UserService) { }

  ngOnInit(): void {
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

}
