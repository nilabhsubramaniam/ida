import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // if you are using routerLink in your welcome page
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-welcome',
  standalone: true, 
  imports: [CommonModule, RouterLink, MatIconModule], 
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userName: string = 'User';
  resumeTip: string = 'Keep your resume concise and tailored to the job description.';
  features = [
    { icon: 'edit', title: 'Edit Your Resume', description: 'Easily edit and customize your resume.' },
    { icon: 'file_download', title: 'Export Options', description: 'Export your resume in multiple formats.' },
    { icon: 'lightbulb', title: 'Resume Tips', description: 'Get tips to make your resume stand out.' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.userName = 'John Doe';
  }

  startResumeBuilder(): void {
    console.log('Navigating to Resume Builder...');
  }

  exploreTemplates(): void {
    console.log('Exploring Templates...');
  }

  openFeedbackForm(): void {
    console.log('Opening Feedback Form...');
  }
}
