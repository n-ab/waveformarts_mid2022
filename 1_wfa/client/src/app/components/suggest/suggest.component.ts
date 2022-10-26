import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SuggestComponent implements OnInit {

  suggestionForm!: FormGroup;

  constructor(private userService: UserService, public dialogRef: MatDialogRef<SuggestComponent>) {
    this.suggestionForm = new FormGroup({
      suggestion: new FormControl('', [Validators.minLength(10), Validators.required])
    })
  }

  ngOnInit(): void {
    this.userService.check().then(user => { if (!user) this.dialogRef.close() })
  }

  makeSuggestion() {
    this.userService.makeSuggestion(this.suggestionForm.getRawValue())
    .then(suggestionId => console.log('suggestion saved: ', suggestionId));
  }

}
