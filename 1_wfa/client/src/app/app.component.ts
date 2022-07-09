import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'client';

  ngAfterViewInit(): void {
    const imageBackground = document.getElementById('img');
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 30) { document.getElementById('navbar')!.classList.add('black-background') }
      if (window.scrollY <= 30) { document.getElementById('navbar')!.classList.remove('black-background') }
    });
    if (window.innerHeight > 625) {
      // make the image full width, 6000px
      // it is currently at 4500px, which is perfect for mobile
      imageBackground?.classList.remove('image-width-4500px');
      imageBackground?.classList.add('image-width-6000px');
    }
  }

}
