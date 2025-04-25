import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { LayoutComponent } from '../../layout/layout.component'; 

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    WelcomeComponent,
    LayoutComponent  
  ]
})
export class WelcomeModule {}
