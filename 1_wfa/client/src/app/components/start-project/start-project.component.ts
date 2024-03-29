import { AfterViewInit, Component, Inject, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-start-project',
  templateUrl: './start-project.component.html',
  styleUrls: ['./start-project.component.scss']
})
export class StartProjectComponent implements OnInit, AfterViewInit {

  createProjectForm!: FormGroup;
  newEmail!: string;
  emailList: string[] = [];
  showStep2 = false;

  constructor(private windowService: WindowService, private userService: UserService, private router: Router, @Inject(MAT_DIALOG_DATA) public matData: string, public dialogRef: MatDialogRef<StartProjectComponent>, private renderer: Renderer2, private el: ElementRef, private projectService: ProjectService) {
    this.createProjectForm = new FormGroup({
      title: new FormControl('Burrows'),
      projectLeadEmail: new FormControl('nick@waveform-arts.com'),
      description: new FormControl('Low budget feature length narrative about a native kid raised white and the physical, spiritual, and cultural implications it had on his growth and has on his future.'),
      projectLeadName: new FormControl('Nick Abercrombie'),
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

  back(): void {
    this.showStep2 = false;
  }

  submitProject(): void {
    console.log('1 1 1 1 ');
    this.createProjectForm.patchValue({ emailList: this.emailList });
    this.dialogRef.close({projectData: this.createProjectForm.getRawValue()});
    // this.dialogRef.afterClosed().subscribe(projectData => projectData);
    // this.projectService.startProject(this.createProjectForm.getRawValue())
      // .then(project => {
        // console.log('project: ', project);
        // this.router.navigateByUrl('project', {state: {projectId: project.projectId}});
        // this.dialogRef.close();
      // })
      // .catch(err => err);
  }

  displayStepTwo() {
    this.showStep2 = true;
    this.focusOnSection2();
  }

  focusOnSection2() {
    const targetField = this.el.nativeElement.querySelector('input#emailSubmitField');
    console.log('targetField: ', targetField);
    if (targetField) {
      this.renderer.selectRootElement(targetField).focus();
    }
  }

  addEmailToList(): void {
    this.emailList.push(this.newEmail);
    this.newEmail = '';
    const emailSubmitField = document.getElementById('email-submit-field');
    const emailSubmitButton = document.getElementById('email-submit-button');
    emailSubmitButton?.addEventListener('submit', function(e) {
      console.log('allegedly... the email submit button was just triggered. was an email added? who knows, mf?!');
      e.preventDefault();
      emailSubmitField?.focus();
    });
  }

  removeEmail(email: string) {
    const index = this.emailList.indexOf(email);
    if (index !== -1) { this.emailList.splice(index, 1); }
  }
}
