import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommunicationsComponent } from './user-communications.component';

describe('UserCommunicationsComponent', () => {
  let component: UserCommunicationsComponent;
  let fixture: ComponentFixture<UserCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommunicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
