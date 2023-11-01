import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-joinproject',
  templateUrl: './joinproject.component.html',
  styleUrls: ['./joinproject.component.scss']
})
export class JoinprojectComponent implements OnInit {

  joinProjectForm!: FormGroup;

  error = false;
  errorMessage = ' ';

  constructor(private projectService: ProjectService, public dialogRef: MatDialogRef<JoinprojectComponent>, private router: Router) {
    this.joinProjectForm = new FormGroup({
      number: new FormControl(null),
      title: new FormControl(null)
    })
  }

  ngOnInit(): void {

  }

  join() {
    console.log('join project form: ', this.joinProjectForm);
    this.projectService.logInToProject(this.joinProjectForm.getRawValue());
    return this.dialogRef.close();
  }

}
