import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ThreeBackgroundService } from '../../../core/services/three-background.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-three-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #threeContainer class="three-container"></div>
  `,
  styles: [`
    .three-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class ThreeBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef<HTMLDivElement>;
  @Input() starCount: number = 2500;

  constructor(private threeService: ThreeBackgroundService) {}

  ngOnInit(): void {
    // Initialize the Three.js scene
    this.threeService.initialize(this.threeContainer, this.starCount);
  }

  ngOnDestroy(): void {
    // Cleanup is handled by the service's ngOnDestroy
  }
}
