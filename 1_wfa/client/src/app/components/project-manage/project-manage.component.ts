import { Component, OnInit } from '@angular/core';
import { MetricsService } from 'src/app/services/metrics.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectObject } from '../../../../../server/src/models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {

  project!: ProjectObject;

  metricHeader = 'ProjectManage'

  constructor(private metricsService: MetricsService, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    if (!history.state.project) this.router.navigateByUrl('upload');
    this.metricsService.addPageMetrics(this.metricHeader, history.state.navigatedFrom);
    console.log('$ history.state: ', history.state);
    this.projectService.getProjectData(history.state.project)
      .then(project => {
        console.log('project returned: ', project);
        this.project = project;
      })
  }

}
