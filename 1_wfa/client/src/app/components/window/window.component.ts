import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, AfterViewInit {

  case!: 'landing' | 'account' | 'hide';
  counter = 0;
  images = ['../../../assets/img/account-landing.jpeg', '../../../assets/img/blackRipple.jpeg', '../../../assets/img/waveform-arts-landing.jpeg'];

  constructor() {

  }

  ngOnInit(): void {
    if (this.counter === 0) { this.case = 'landing' }

  }

  ngAfterViewInit(): void {
    const windowDiv = document.getElementById('window');
    if (this.case = 'landing') { windowDiv?.classList.add('bg-image-1'); }
  }

}
