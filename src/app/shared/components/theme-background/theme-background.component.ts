import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { ThreeBackgroundService } from '../../../core/services/three-background.service';

@Component({
  selector: 'app-three-background',
  standalone: true,
  template: `<div #backgroundContainer class="theme-background"></div>`,
  styles: [`
    .theme-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
    }
  `]
})
export class ThreeBackgroundComponent implements OnInit, OnDestroy {
  @Input() starCount = 3000;
  @ViewChild('backgroundContainer', { static: true }) 
  private backgroundContainer!: ElementRef<HTMLElement>;

  constructor(private threeBackgroundService: ThreeBackgroundService) {}

  ngOnInit() {
    // Initialize the Three.js background with provided star count
    this.threeBackgroundService.initialize(this.backgroundContainer, this.starCount);
  }

  ngOnDestroy() {
    // Service's ngOnDestroy will clean up resources
  }
}
