import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
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
export class StartProjectComponent implements OnInit, AfterViewInit {

  createProjectForm!: FormGroup;
  emailList: string[] = [];
  showStep2 = false;

  constructor(private windowService: WindowService, private userService: UserService, private router: Router, @Inject(MAT_DIALOG_DATA) public matData: string, public dialogRef: MatDialogRef<StartProjectComponent>) {
    this.createProjectForm = new FormGroup({
      title: new FormControl(''),
      projectLeadEmail: new FormControl(''),
      description: new FormControl(''),
      projectLeadName: new FormControl(''),
      emailList: new FormControl(['']),
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.getElementById('email-submit')?.addEventListener('keydown', event => {
      console.log('event: ', event);
      
      console.log('the shit that was pressed down is:', event.key);
    })
  }

  submitProject(): void {
    this.userService.submitProject(this.createProjectForm.getRawValue())
      .then(project => {
        
      })
  }

  displayStepTwo() {
    this.showStep2 = true;
  }

  addEmailToEmailList(email: string): void {
    this.emailList.push(email);
  }
}
