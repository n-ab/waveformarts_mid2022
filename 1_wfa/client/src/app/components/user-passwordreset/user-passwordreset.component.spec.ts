import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordresetComponent } from './user-passwordreset.component';

describe('UserPasswordresetComponent', () => {
  let component: UserPasswordresetComponent;
  let fixture: ComponentFixture<UserPasswordresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPasswordresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPasswordresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
