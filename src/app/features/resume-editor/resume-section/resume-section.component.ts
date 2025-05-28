import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser, faGraduationCap, faBriefcase, faCode, faFolder, 
  faTrophy, faGlobe, faPlus, faTimes, faPencil, faTrash,
  faEnvelope, faPhone, faMapMarker, faLink
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface EducationItem {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface SkillGroup {
  name: string;
  skills: string[];
}

interface ProjectItem {
  name: string;
  description: string;
  link?: string;
}

interface AwardItem {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

interface LanguageItem {
  name: string;
  level: string;
}

@Component({
  selector: 'app-resume-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './resume-section.component.html',
  styleUrl: './resume-section.component.scss'
})
export class ResumeSectionComponent {
  @Input() sectionType: string = '';
  
  // Font Awesome icons
  faUser = faUser;
  faGraduationCap = faGraduationCap;
  faBriefcase = faBriefcase;
  faCode = faCode;
  faFolder = faFolder;
  faTrophy = faTrophy;
  faGlobe = faGlobe;
  faPlus = faPlus;
  faTimes = faTimes;
  faPencil = faPencil;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarker = faMapMarker;
  faLink = faLink;
  faLinkedin = faLinkedin;
  
  // Sample data for demo purposes
  educationItems: EducationItem[] = [
    {
      degree: 'Master of Computer Science',
      institution: 'Stanford University',
      startDate: '2018',
      endDate: '2020',
      description: 'Specialized in Machine Learning and Artificial Intelligence'
    },
    {
      degree: 'Bachelor of Engineering',
      institution: 'MIT',
      startDate: '2014',
      endDate: '2018',
      description: 'Computer Science and Engineering'
    }
  ];
  
  experienceItems: ExperienceItem[] = [
    {
      title: 'Senior Software Engineer',
      company: 'Google',
      startDate: 'Jan 2021',
      description: 'Lead developer for cloud infrastructure projects. Implemented scalable solutions using Kubernetes and Docker.'
    },
    {
      title: 'Software Developer',
      company: 'Microsoft',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      description: 'Developed enterprise applications using .NET Core and Azure cloud services.'
    }
  ];
  
  skillGroups: SkillGroup[] = [
    {
      name: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#']
    },
    {
      name: 'Frameworks & Libraries',
      skills: ['Angular', 'React', 'Node.js', 'Express', 'Django']
    },
    {
      name: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure']
    }
  ];
  
  projectItems: ProjectItem[] = [
    {
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with Angular, Node.js, and MongoDB',
      link: 'https://github.com/example/ecommerce'
    },
    {
      name: 'Machine Learning Model for Predictive Analytics',
      description: 'Developed a TensorFlow model for sales forecasting with 95% accuracy',
      link: 'https://github.com/example/ml-analytics'
    }
  ];
  
  awardItems: AwardItem[] = [
    {
      title: 'Best Mobile App Award',
      issuer: 'Mobile Innovation Summit',
      date: '2022',
      description: 'Awarded for innovative UX design and performance optimization'
    },
    {
      title: 'Outstanding Graduate Award',
      issuer: 'Stanford University',
      date: '2020'
    }
  ];
  
  languageItems: LanguageItem[] = [
    {
      name: 'English',
      level: 'Native'
    },
    {
      name: 'Spanish',
      level: 'Advanced'
    },
    {
      name: 'French',
      level: 'Intermediate'
    }
  ];
  
  // Methods to handle section interactions
  addNewEducation(): void {
    // Implementation would open a form dialog or similar UI
    console.log('Adding new education');
  }
  
  editEducation(index: number): void {
    console.log(`Editing education at index ${index}`);
  }
  
  removeEducation(index: number): void {
    this.educationItems.splice(index, 1);
  }
  
  addNewExperience(): void {
    console.log('Adding new experience');
  }
  
  editExperience(index: number): void {
    console.log(`Editing experience at index ${index}`);
  }
  
  removeExperience(index: number): void {
    this.experienceItems.splice(index, 1);
  }
  
  addNewSkillGroup(): void {
    console.log('Adding new skill group');
  }
  
  editSkillGroup(index: number): void {
    console.log(`Editing skill group at index ${index}`);
  }
  
  removeSkillGroup(index: number): void {
    this.skillGroups.splice(index, 1);
  }
  
  addSkillToGroup(groupIndex: number): void {
    console.log(`Adding skill to group at index ${groupIndex}`);
  }
  
  removeSkill(groupIndex: number, skillIndex: number): void {
    this.skillGroups[groupIndex].skills.splice(skillIndex, 1);
  }
  
  addNewProject(): void {
    console.log('Adding new project');
  }
  
  editProject(index: number): void {
    console.log(`Editing project at index ${index}`);
  }
  
  removeProject(index: number): void {
    this.projectItems.splice(index, 1);
  }
  
  addNewAward(): void {
    console.log('Adding new award');
  }
  
  editAward(index: number): void {
    console.log(`Editing award at index ${index}`);
  }
  
  removeAward(index: number): void {
    this.awardItems.splice(index, 1);
  }
  
  addNewLanguage(): void {
    console.log('Adding new language');
  }
  
  editLanguage(index: number): void {
    console.log(`Editing language at index ${index}`);
  }
  
  removeLanguage(index: number): void {
    this.languageItems.splice(index, 1);
  }
  
  getProficiencyPercentage(level: string): number {
    switch(level.toLowerCase()) {
      case 'native':
      case 'fluent': return 100;
      case 'advanced': return 85;
      case 'intermediate': return 65;
      case 'beginner': return 40;
      default: return 50;
    }
  }
}
