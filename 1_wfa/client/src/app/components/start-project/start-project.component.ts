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
      title: new FormControl('Trauma Bonded'),
      projectLeadEmail: new FormControl('chloe@traumabonded.com'),
      description: new FormControl('i have fatty liver disease and am trying to be as healthy as possible. I am currently eating a breakfast of 3 eggs scrambled, a ton of arugula, and seasoned with cumin, pepper, and turmeric. How can I make this meal even healthier?'),
      projectLeadName: new FormControl('Chloe Burns'),
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
    this.createProjectForm.patchValue({ emailList: this.emailList });
    this.projectService.startProject(this.createProjectForm.getRawValue())
      .then(project => {
        this.router.navigateByUrl('project', {state: {projectId: project.projectId}});
        this.dialogRef.close();
      })
      .catch(err => err);
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
