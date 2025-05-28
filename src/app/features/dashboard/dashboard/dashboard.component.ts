import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileAlt, faDownload, faBriefcase, faStar, faSortAmountDown, faEdit, faEye, faEllipsisH, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  // FontAwesome icons
  faFileAlt = faFileAlt;
  faDownload = faDownload;
  faBriefcase = faBriefcase;
  faStar = faStar;
  faSort = faSortAmountDown;
  faEdit = faEdit;
  faEye = faEye;
  faEllipsisH = faEllipsisH;
  faPlus = faPlusCircle;

  // Mock data that would eventually come from a service
  resumes = [
    {
      id: 1,
      title: 'Software Developer Resume',
      description: 'Modern template with technical focus',
      lastUpdated: '3 days ago',
      downloads: 8,
      previewImage: 'assets/images/resume-thumb-1.png'
    },
    {
      id: 2,
      title: 'Project Manager CV',
      description: 'Professional template for leadership roles',
      lastUpdated: '1 week ago',
      downloads: 5,
      previewImage: 'assets/images/resume-thumb-2.png'
    }
  ];

  recentActivities = [
    {
      id: 1,
      action: 'Updated "Software Developer Resume"',
      time: 'Today, 10:25 AM',
      icon: 'edit'
    },
    {
      id: 2,
      action: 'Downloaded "Project Manager CV" as PDF',
      time: 'Yesterday, 3:45 PM',
      icon: 'download'
    },
    {
      id: 3,
      action: 'Created new resume "Project Manager CV"',
      time: 'Jan 15, 2023',
      icon: 'plus-circle'
    }
  ];

  stats = {
    resumesCreated: 3,
    downloads: 15,
    jobApplications: 8,
    profileCompletion: '85%'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Future implementation: Load data from services
  }

  editResume(id: number): void {
    console.log(`Editing resume with ID: ${id}`);
    this.router.navigate(['/resume-editor', id]);
  }

  previewResume(id: number): void {
    console.log(`Previewing resume with ID: ${id}`);
    this.router.navigate(['/resume-preview', id]);
  }

  createNewResume(): void {
    console.log('Creating new resume');
    this.router.navigate(['/resume-editor', 'new']);
  }
}
