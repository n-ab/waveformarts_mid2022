import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.scss']
})
export class StartProjectComponent implements OnInit {

  createProjectForm!: FormGroup;

  constructor(private windowService: WindowService, private userService: UserService, private router: Router) {
    this.createProjectForm = new FormGroup({
      title: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.windowService.bgImageMarginTop.next(1000);
  }

  submitProject(): void {
    this.userService.submitProject(this.createProjectForm.getRawValue())
      .then(project => {
        this.router.navigateByUrl('account/messages', {state: {project: project, selection: 'sendMessage'}});
      })
  }

}
