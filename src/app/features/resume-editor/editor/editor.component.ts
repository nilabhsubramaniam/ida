import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser, faGraduationCap, faBriefcase, faCode, 
  faFolder, faTrophy, faGlobe, faSave,
  faEye, faDownload, faUndo, faRedo
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResumeSectionComponent } from '../resume-section/resume-section.component';

interface SocialProfile {
  platform: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, ReactiveFormsModule, ResumeSectionComponent]
})
export class EditorComponent implements OnInit {
  personalInfoForm!: FormGroup;
  
  // Section navigation
  activeSection: string = 'personal';
  
  // Font Awesome icons
  faUser = faUser;
  faGraduationCap = faGraduationCap;
  faBriefcase = faBriefcase;
  faCode = faCode;
  faFolder = faFolder;
  faTrophy = faTrophy;
  faGlobe = faGlobe;
  faSave = faSave;
  faEye = faEye;
  faDownload = faDownload;
  faUndo = faUndo;
  faRedo = faRedo;
  
  resumeSections = [
    { id: 'personal', name: 'Personal Information', icon: 'user', status: 'complete' },
    { id: 'work', name: 'Work Experience', icon: 'briefcase', status: 'warning' },
    { id: 'education', name: 'Education', icon: 'graduation-cap', status: 'complete' },
    { id: 'skills', name: 'Skills', icon: 'laptop-code', status: 'complete' },
    { id: 'achievements', name: 'Achievements', icon: 'trophy', status: 'empty' },
    { id: 'projects', name: 'Projects', icon: 'project-diagram', status: 'empty' },
    { id: 'languages', name: 'Languages', icon: 'language', status: 'empty' }
  ];
  
  currentSection = 'personal';
  socialProfiles: SocialProfile[] = [
    { platform: 'LinkedIn', url: '', icon: 'linkedin' },
    { platform: 'GitHub', url: '', icon: 'github' }
  ];
  
  availableSocialPlatforms = [
    { name: 'Twitter', icon: 'twitter' },
    { name: 'Medium', icon: 'medium' },
    { name: 'Dribbble', icon: 'dribbble' },
    { name: 'Stack Overflow', icon: 'stack-overflow' },
    { name: 'Behance', icon: 'behance' }
  ];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      headline: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      website: [''],
      summary: ['']
    });
  }
  
  setActiveSection(sectionId: string): void {
    this.currentSection = sectionId;
    // In a real app, you would save the current section's data before switching
  }
  
  addSocialProfile(): void {
    // In a real implementation, you would show a dropdown or dialog to select platform
    const newProfile: SocialProfile = { 
      platform: 'Twitter',
      url: '',
      icon: 'twitter'
    };
    this.socialProfiles.push(newProfile);
  }
  
  removeSocialProfile(index: number): void {
    this.socialProfiles.splice(index, 1);
  }
  
  saveAndContinue(): void {
    if (this.personalInfoForm.valid) {
      console.log('Form data:', this.personalInfoForm.value);
      // Save data and move to next section
      const currentIndex = this.resumeSections.findIndex(section => section.id === this.currentSection);
      if (currentIndex < this.resumeSections.length - 1) {
        this.currentSection = this.resumeSections[currentIndex + 1].id;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.personalInfoForm.controls).forEach(key => {
        this.personalInfoForm.get(key)?.markAsTouched();
      });
    }
  }
  
  goToPrevious(): void {
    const currentIndex = this.resumeSections.findIndex(section => section.id === this.currentSection);
    if (currentIndex > 0) {
      this.currentSection = this.resumeSections[currentIndex - 1].id;
    }
  }
  
  previewResume(): void {
    console.log('Navigating to preview');
    // Navigate to preview component
  }
}
