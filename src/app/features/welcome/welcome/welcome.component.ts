import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // if you are using routerLink in your welcome page

@Component({
  selector: 'app-welcome',
  standalone: true, 
  imports: [CommonModule, RouterLink], 
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {}
