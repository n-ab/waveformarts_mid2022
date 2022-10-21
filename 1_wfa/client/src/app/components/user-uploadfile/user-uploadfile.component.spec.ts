import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUploadfileComponent } from './user-uploadfile.component';

describe('UserUploadfileComponent', () => {
  let component: UserUploadfileComponent;
  let fixture: ComponentFixture<UserUploadfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUploadfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUploadfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
