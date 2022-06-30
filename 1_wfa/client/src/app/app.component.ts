import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'client';

  ngAfterViewInit(): void {
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 30) { document.getElementById('navbar')!.classList.add('black-background') }
        if (window.scrollY <= 30) { document.getElementById('navbar')!.classList.remove('black-background') }
      })
  }

}
