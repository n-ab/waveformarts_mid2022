import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.scss']
})
export class StartProjectComponent implements OnInit {

  createProjectForm!: FormGroup;
  joinProjectForm!: FormGroup;
  startingProject!: boolean;

  constructor(private windowService: WindowService, private userService: UserService, private router: Router, @Inject(MAT_DIALOG_DATA) public matData: string, public dialogRef: MatDialogRef<StartProjectComponent>) {
    this.createProjectForm = new FormGroup({
      title: new FormControl(''),
    })
    this.joinProjectForm = new FormGroup({
      projectNumber: new FormControl(''),
      currentMemberName: new FormControl(''),
    })
  }

  ngOnInit(): void {
    console.log('this.matData = ', this.matData);
    if (this.matData == 'join') {
      console.log('JOINING project');
      this.startingProject = false;
    } else {
      console.log('STARTING project');
      this.startingProject = true;
    }
    
    this.windowService.bgImageMarginTop.next(1000);
  }

  submitProject(): void {
    this.userService.submitProject(this.createProjectForm.getRawValue())
      .then(project => {
        this.router.navigateByUrl('account/messages', {state: {project: project, selection: 'sendMessage'}});
      })
  }

  joinProject(): void {
    this.userService.joinProject(this.joinProjectForm.getRawValue())
      .then(projectUsers => {
        console.log('projectUsers returned from server: ', projectUsers);
        this.dialogRef.close();
      })
      .catch(err => console.log(err))
  }
}
