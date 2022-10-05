import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor() {
    this.contactForm = new FormGroup({
      name: new FormControl('', null),
      email: new FormControl('', null),
      company: new FormControl('', null),
      projectTitle: new FormControl('', null),
    });
  }

  ngOnInit(): void {
  }

  submit() {
    return;
  }

}
