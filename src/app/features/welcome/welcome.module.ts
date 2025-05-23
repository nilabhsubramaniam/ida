import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule, // Added MatIconModule to resolve 'mat-icon' error
    WelcomeRoutingModule
  ]
})
export class WelcomeModule {}
