import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  metricHeader = 'ProjectAdd'

  constructor(private metricsService: MetricsService) { }

  ngOnInit(): void {
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
  }

}
