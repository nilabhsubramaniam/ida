import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ThreeBackgroundComponent } from '../../../shared/components/three-background/three-background.component';

interface ResumeStatistic {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

interface RecentActivity {
  action: string;
  resumeTitle?: string;
  time: string;
  icon: string;
}

interface ResumeTip {
  text: string;
  category: string;
}

@Component({
  selector: 'app-welcome',
  standalone: true, 
  imports: [CommonModule, RouterLink, MatIconModule, ThreeBackgroundComponent], 
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userName: string | null = null;
  isLoggedIn = false;
  
  // Resume tips collection
  resumeTips: ResumeTip[] = [
    { text: 'Keep your resume concise and limit it to 1-2 pages for better readability.', category: 'Format' },
    { text: 'Tailor your resume to the specific job by matching keywords from the job description.', category: 'Content' },
    { text: 'Quantify your achievements with numbers to demonstrate your impact.', category: 'Impact' },
    { text: 'Start bullet points with strong action verbs to make your accomplishments stand out.', category: 'Language' },
    { text: 'Use the chronological format if you have a solid work history with no gaps.', category: 'Structure' },
    { text: 'Choose a clean, professional template that suits your industry standards.', category: 'Design' }
  ];
  
  // Current tip to display
  resumeTip: ResumeTip = this.resumeTips[0];
  
  // User statistics for dashboard overview
  statistics: ResumeStatistic[] = [
    { title: 'Resumes Created', value: 3, icon: 'description', color: 'var(--primary-light)' },
    { title: 'Downloads', value: 8, icon: 'download', color: 'var(--secondary-light)' },
    { title: 'Profile Completion', value: '85%', icon: 'person', color: 'var(--accent-light)' },
    { title: 'Active Templates', value: 2, icon: 'style', color: 'var(--info-light)' }
  ];
  
  // Recent activity
  recentActivities: RecentActivity[] = [
    {
      action: 'Updated',
      resumeTitle: 'Software Developer Resume',
      time: '3 days ago',
      icon: 'edit'
    },
    {
      action: 'Downloaded',
      resumeTitle: 'Project Manager CV',
      time: '1 week ago',
      icon: 'cloud_download'
    },
    {
      action: 'Created new resume',
      resumeTitle: 'Data Analyst Profile',
      time: '2 weeks ago',
      icon: 'add_circle'
    }
  ];
  
  // Feature highlights
  features = [
    { icon: 'edit', title: 'AI-Powered Resume Builder', description: 'Our smart editor helps you craft the perfect resume with industry-specific suggestions.' },
    { icon: 'style', title: 'Professional Templates', description: 'Choose from dozens of ATS-friendly templates designed by HR professionals.' },
    { icon: 'lightbulb', title: 'Expert Resume Tips', description: 'Get personalized advice to help your resume stand out from the competition.' },
    { icon: 'assessment', title: 'Resume Analytics', description: 'Understand how well your resume performs with detailed feedback and suggestions.' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.userName = isLoggedIn ? 'User' : null;
      
      // Pick a random resume tip
      this.resumeTip = this.resumeTips[Math.floor(Math.random() * this.resumeTips.length)];
      
      // Check if this is an explicit visit to home from a logged-in state
      const fromLogin = this.route.snapshot.queryParamMap.has('fromLogin');
      const loggedOut = this.route.snapshot.queryParamMap.has('loggedOut');
      
      // If user is logged in and didn't explicitly navigate here, redirect to dashboard
      if (isLoggedIn && !fromLogin && !loggedOut) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  startResumeBuilder(): void {
    // For non-logged-in users, show a preview of the resume builder with a prompt to create an account
    // after they've seen some value from the product
    if (this.isLoggedIn) {
      this.router.navigate(['/resume-editor/new']);
    } else {
      // Navigate to a demo/preview version or the same page with a sign-up prompt
      this.router.navigate(['/resume-editor/demo']);
      
      // Alternatively, you could show a modal here explaining the benefits of creating an account
      // this.showSignUpBenefitsModal('resume-editor');
    }
  }

  exploreTemplates(): void {
    // Navigate to the templates gallery - same path used in navbar
    this.router.navigate(['/resume-theme']);
    
    // Add analytics tracking of button click (if implemented)
    // this.analyticsService.trackEvent('explore_templates_click', { source: 'welcome_page' });
  }

  openFeedbackForm(): void {
    // Open feedback form
  }
  
  getNextTip(): void {
    const currentIndex = this.resumeTips.indexOf(this.resumeTip);
    const nextIndex = (currentIndex + 1) % this.resumeTips.length;
    this.resumeTip = this.resumeTips[nextIndex];
  }
}
