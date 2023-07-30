import { AfterViewInit, Component } from '@angular/core';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'Waveform Arts';
  backgroundImageDiv!: HTMLElement | null;
  width!: number;

  constructor(private windowService: WindowService) {
    // this.width = 3000;
    // this.adjustBackgroundImagePosition('landing');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('overlay')!.classList.add('display-none');
    }, 1000);
    // NAVBAR 'blacken background on scroll' EFFECT
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 30) { document.getElementById('navbar')!.classList.add('black-background') }
      if (window.scrollY <= 30) { document.getElementById('navbar')!.classList.remove('black-background') }
    });
  }

  ngAfterViewChecked(): void {
      // start subscribing to the window service's observable here,
      // now that you know at this point the service has loaded.
      // this.windowService.updateBackgroundImageWidth.subscribe(shitFromService => {
      //   console.log('SHIT FROM SERVICE: ', shitFromService);
      //   this.adjustBackgroundImagePosition(shitFromService);
      // })
  }

  adjustBackgroundImagePosition(pageName: string): void {
    
    // switch (pageName) {
    //   case 'landing':
    //     if    ( window.innerHeight > 625) {
    //       this.width = 3000; 
    //       setTimeout(() => {
    //         this.width = 3400;
    //       }, 1000);
    //       } 
    //     else { this.width = 2200; 
    //       setTimeout(() => {
    //       this.width = 2700;
    //     }, 1000); 
    //     }
    //     break;
    //   case 'upload':
    //     this.width = 4000;
    //     break;
    //   case 'contact':

    //     break;
    //   case 'book':

    //     break;
    // }
    return;
  }

}
