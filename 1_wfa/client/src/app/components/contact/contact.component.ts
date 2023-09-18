import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MetricsService } from 'src/app/services/metrics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {

  contactForm!: FormGroup;
  metricHeader = 'Contact';
  showSectionOne = true;
  showSectionTwo = false;
  secOne = true;
  secTwo = false;
  name!: string;
  email!: string;
  company!: string;
  projectTitle!: string;
  message!: string;

  constructor(private metricsService: MetricsService, private userService: UserService, private router: Router) {
    this.contactForm = new FormGroup({
      name: new FormControl('', null),
      email: new FormControl('', null),
      company: new FormControl('', null),
      projectTitle: new FormControl('', null),
      message: new FormControl('', null)
    });
  }

  ngOnInit(): void {
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  ngAfterViewInit(): void {
      // if (this.showSectionOne && this.secOne)
  }

  displaySectionTwo(): void {
    const contactTitle = document.getElementById('contact-title');
    contactTitle?.classList.remove('contact-title-margin-bottom-1');
    contactTitle?.classList.add('contact-title-margin-bottom-2');
    this.name = this.contactForm.get('name')!.value;
    this.email = this.contactForm.get('email')!.value;
    this.company = this.contactForm.get('company')!.value;
    this.projectTitle = this.contactForm.get('projectTitle')!.value;
    // const sectionOneProjectData = {
    //   name: this.contactForm.get('name')!.value,
    //   email: this.contactForm.get('email')!.value,
    //   company: this.contactForm.get('company')!.value,
    //   projectTitle: this.contactForm.get('projectTitle')!.value
    // }
    this.showSectionOne = false;
    this.secOne = false;
    this.showSectionTwo = true;
    setTimeout(() => {
      this.secTwo = true;
      const textArea = document.getElementById('text-area');
      console.log('textArea = ', textArea);
      
      textArea?.autofocus;
    }, 500);
  }

  back(): void {
    this.contactForm.reset();
    this.showSectionOne = true;
    this.showSectionTwo = false;
  }

  submit() {
    this.userService.contact(this.contactForm.getRawValue())
      .then(user => {
        console.log('new contact form successfully submitted: ', user);
      });
    this.router.navigateByUrl('post-contact');
  }

}
