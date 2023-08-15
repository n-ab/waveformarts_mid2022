import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, AfterViewInit {
  metricHeader = 'Book';
  bookForm!: FormGroup;

  constructor(private metricsService: MetricsService) {
    this.bookForm = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      mixer: new FormControl(null),
      wireless: new FormControl(null),
      wirelessAmount: new FormControl(null),
      numberOfCharacters: new FormControl(null),
      boom: new FormControl(null),
      boomAmount: new FormControl(null),
      timecodeAmount: new FormControl(null),
      cameraTimecodeInput: new FormControl(null),
      slate: new FormControl(null),
      additionalNotes: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

  ngAfterViewInit(): void {
  }

  submit() {
    return;
  }

}
