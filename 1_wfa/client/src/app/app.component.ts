import { AfterViewInit, AfterViewChecked, Component, Input } from '@angular/core';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'client';
  backgroundImageDiv!: HTMLElement | null;
  width!: number;

  constructor(private windowService: WindowService) {
    this.width = 3000;
    this.adjustBackgroundImagePosition('landing');
  }

  ngAfterViewInit(): void {
    this.backgroundImageDiv = document.getElementById('img');

    // NAVBAR 'blacken background on scroll' EFFECT
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 30) { document.getElementById('navbar')!.classList.add('black-background') }
      if (window.scrollY <= 30) { document.getElementById('navbar')!.classList.remove('black-background') }
    });

    // SITE BACKGROUND IMAGE 'initial width setting' EFFECT
    // if (window.innerHeight > 625) { this.width = 3000; } else {
    //   this.width = 1900;
    // }

    // setTimeout(() => {
    //   this.adjustBackgroundImagePosition('landing');
    // }, 500); 
  }

  ngAfterViewChecked(): void {
      // start subscribing to the window service's observable here,
      // now that you know at this point the service has loaded.
      this.windowService.updateBackgroundImageWidth.subscribe(shitFromService => {
        console.log('SHIT FROM SERVICE: ', shitFromService);
        this.adjustBackgroundImagePosition(shitFromService);
      })
  }

  adjustBackgroundImagePosition(pageName: string): void {
    
    switch (pageName) {
      case 'landing':
        console.log('this.width', this.width);
        
        if    ( window.innerHeight > 625) { this.width = 3200; } 
        else                              { this.width = 2400; }
        break;
      case 'upload':
        this.width = 3000;
        break;
      case 'contact':

        break;
      case 'book':

        break;
    }
    return;
  }

}
