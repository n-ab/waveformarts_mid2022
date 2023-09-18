import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPostComponent } from './contact-post.component';

describe('ContactPostComponent', () => {
  let component: ContactPostComponent;
  let fixture: ComponentFixture<ContactPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
