import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioWorkletComponent } from './audio-worklet.component';

describe('AudioWorkletComponent', () => {
  let component: AudioWorkletComponent;
  let fixture: ComponentFixture<AudioWorkletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioWorkletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioWorkletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
