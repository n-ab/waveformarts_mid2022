import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  metricHeader = 'Contact';
  constructor(private metricsService: MetricsService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', null),
      email: new FormControl('', null),
      company: new FormControl('', null),
      projectTitle: new FormControl('', null),
    });
  }

  ngOnInit(): void {
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  submit() {
    return;
  }

}
