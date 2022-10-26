import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'app-faq-account',
  templateUrl: './faq-account.component.html',
  styleUrls: ['./faq-account.component.scss']
})
export class FaqAccountComponent implements OnInit {

  metricHeader = 'FAQs'

  constructor(private router: Router, public dialogRef: MatDialogRef<FaqAccountComponent>) { }

  ngOnInit(): void {
  }

}
