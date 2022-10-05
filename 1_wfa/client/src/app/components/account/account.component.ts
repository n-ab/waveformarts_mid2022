import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, private windowService: WindowService) { }

  ngOnInit(): void {
    this.windowService.bgImageMarginLeft.next(5000);
  }

}
