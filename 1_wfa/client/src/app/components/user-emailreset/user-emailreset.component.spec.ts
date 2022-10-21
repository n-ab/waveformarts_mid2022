import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailresetComponent } from './user-emailreset.component';

describe('UserEmailresetComponent', () => {
  let component: UserEmailresetComponent;
  let fixture: ComponentFixture<UserEmailresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEmailresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmailresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
