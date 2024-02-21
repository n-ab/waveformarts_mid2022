import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-audio-worklet',
  templateUrl: './audio-worklet.component.html',
  styleUrls: ['./audio-worklet.component.scss']
})
export class AudioWorkletComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('timeSlider') timeSlider!: MatSlider;
  @ViewChild('volumeSlider') volumeSlider!: MatSlider;
  @Input() audioSrc!: string;
  audio!: HTMLAudioElement;
  duration!: number;
  currentTime = 0;
  audioPlaying = false;
  progress!: number;
  sliderValue = 0;
  mode: ProgressBarMode = 'determinate';
  volume = 20;
  playPause = 'play' || 'pause' ;
  color = 'primary';
  selectedAudio = '';
  audioControlPanel!: HTMLElement | null;
  showControlPanel = false;
  audioContext!: AudioContext; 
  analyser!: AnalyserNode;
  javascriptNode!: AudioWorkletNode; 
  analyserVolumeLevel = 0;
  category = '';
  fileName = '';

  constructor() { }

  ngOnInit(): void {
    this.initAudio();
    setTimeout(() => {
      this.applyScroll();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.audioSrc && changes.audioSrc.currentValue !== changes.audioSrc.previousValue) {
      const newFileUrl = Object.values(changes)[0].currentValue;
      this.audioSrc = newFileUrl;
      this.initAudio();
    }
    this.applyScroll();
  }
  
  ngAfterViewInit(): void { 
    this.initAudio();
    if (this.timeSlider) {
      this.timeSlider.valueChange.subscribe(newValue => {
        console.log('time slider moved to new value: ', newValue);
        if (newValue !== null) {
          this.currentTime = newValue;
          this.progress = newValue;
        }
      })
    }
    if (this.volumeSlider) {
      this.volumeSlider.valueChange.subscribe(newVolume => {
        console.log('volume changed to ', newVolume);
        if (newVolume !== null) {
          this.volume = newVolume;
        } 
      })
    }
    this.audioControlPanel = document.getElementById('audio-controls');
    document.addEventListener('DOMContentLoaded', this.applyScroll);
  }

  initAudio() {
    if (this.audio) {
      this.audio.currentTime = 0;
    }
    if (this.audioSrc) {
      console.log('audio-worklet - this.audioSrc: ', this.audioSrc);
      
      const url = this.audioSrc;
      const partAfter8000 = url.includes('8000') ? url.split('8000')[1] : url;
      const parts = partAfter8000.replace(/^\/|\/$/g, '').split('/');
      this.category = parts[2];
      this.fileName = parts[parts.length - 1];
      console.log('filename being measured: ', this.fileName);
      this.audio = new Audio(this.audioSrc);
      this.audio.load();
      this.audio.currentTime = 0;
      this.selectedAudio = this.audioSrc;
      this.audio.addEventListener('canplay', (event) => {
        this.duration = this.audio.duration;
      });
      this.audio.addEventListener('timeupdate', (event) => {
        this.currentTime = this.audio.currentTime;
        this.progress = this.audio.currentTime / this.audio.duration;
      });
    this.audioPlaying = true;
    // this.audio.currentTime = this.currentTime;
    this.audio.currentTime = 0;
    this.audio.volume = this.volume / 100;
    this.audio.play();
    }
  }

  formatLabel(value: number) {
    return Math.round(value * 10);
  }

  formatLabel2(value: number) {
    return Math.round(value * 100) / 100;
  }

  applyScroll() {
    const textContainer: HTMLElement | null = document.querySelector('.audio-title-text-container');
    const textElement: HTMLElement | null = document.querySelector('.audio-title-text');
    if (textContainer && textElement) {
      textElement.style.animation = '';
      const containerWidth = textContainer.offsetWidth;
      const textWidth = textElement.offsetWidth;
      if (textWidth > containerWidth) {
        console.log('applyScroll shit: ', {
          textContainer, 
          textElement, 
          containerWidth, 
          textWidth
        });
        
        const translateXValue = textWidth - containerWidth;
        const animationName = 'scrollTextEffect';
        const keyframes = `
          @keyframes ${animationName} {
            0% { transform: translateX(0); opacity: 1; }
            15% { transform: translateX(0); opacity: 1; }
            80% { transform: translateX(-${translateXValue}px); opacity: 1; }
            90% { transform: translateX(-${translateXValue}px); opacity: 0; }
            95% { transform: translateX(0px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerHTML = keyframes;
        document.head.appendChild(styleSheet);
        textElement.style.animation = `${animationName} 6 s linear infinite`;
      }
    }
  }

  audioPlayPause(selection: string) {
    if (selection == 'play') { this.playPause = 'play'; return this.audio.play() }
    else { this.playPause = 'pause'; return this.audio.pause() }
  }

  audioStop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  updateVolume(newVolume: any ): void {
    const exponent = 4;
    const transformedVolume = Math.pow(newVolume, exponent);
    this.volume = transformedVolume;
    this.audio.volume = transformedVolume;
    const actualVolume = Math.pow(transformedVolume, 1 / exponent);
    this.volume = actualVolume;
    this.audio.volume = actualVolume;
  }

  updatePlaybackPosition(newPosition: any ): void {
    this.currentTime = newPosition;
    this.audio.currentTime = newPosition;
  }

}
