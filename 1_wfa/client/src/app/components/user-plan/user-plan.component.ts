import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User, Plan } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-plan',
  templateUrl: './user-plan.component.html',
  styleUrls: ['./user-plan.component.scss']
})
export class UserPlanComponent implements OnInit, AfterViewInit {

  user!: User;
  plan = '';
  standard!: HTMLElement | null;
  plus!: HTMLElement | null;
  preferred!: HTMLElement | null;
  planChosen = false;
  selection = '';
  switch = false;
  confirmSwitchBool = false;
  

  constructor(public dialogRef: MatDialogRef<UserPlanComponent>, private userService: UserService) {

  }

  ngOnInit(): void {
        this.userService.fetchPlan()
          .then(plan => {
            this.highlightCurrentPlan(plan);
            this.plan = plan;
          })
  }

  ngAfterViewInit(): void {
      this.standard = document.getElementById('standard');
      this.plus = document.getElementById('plus');
      this.preferred = document.getElementById('preferred');
  }

  highlightCurrentPlan(plan: string) {
    switch (plan) {
      case 'standard':
        console.log('user plan = ', plan);
        console.log(this.standard);
        this.standard?.classList.add('highlight');
        document.getElementById('standard')?.classList.add('highlight');
        break;
      case 'plus':
        console.log('user plan = ', plan);
        console.log(this.plus);
        this.plus?.classList.add('highlight');
      break;
      case 'preferred':
        console.log('user plan = ', plan);
        console.log(this.preferred);
        this.preferred?.classList.add('highlight');
      break;
    
      default:
        break;
    }
  }

  selectionMade(selection: string): void {
    this.planChosen = true;
    this.dialogRef.updateSize('95%', '84%')
    this.selection = selection;
  }

  switchPlan(): void {
    this.switch = true;
  }

  confirmSwitch() {
    this.confirmSwitchBool = true;
  }

}
