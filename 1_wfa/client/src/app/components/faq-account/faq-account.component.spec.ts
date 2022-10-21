import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAccountComponent } from './faq-account.component';

describe('FaqAccountComponent', () => {
  let component: FaqAccountComponent;
  let fixture: ComponentFixture<FaqAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
