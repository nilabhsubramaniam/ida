import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatCheckboxModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hidePassword = true;
  currentQuoteIndex = 0;
  quoteInterval: any;
  quotes = [
    {
      text: "आत्मनो मोक्षार्थं जगद्धिताय च",
      translation: "For one's own spiritual freedom and for the welfare of the world",
      author: "Rig Veda"
    },
    {
      text: "विद्या ददाति विनयं विनयाद्याति पात्रताम्",
      translation: "Knowledge gives humility, from humility comes worthiness",
      author: "Hitopadesa"
    },
    {
      text: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च। तस्मादपरिहार्येऽर्थे न त्वं शोचितुमर्हसि॥ ",
      translation: "Death is certain for the born, and re-birth is certain for the dead; therefore you should not feel grief for what is inevitable.",
      author: "Bhagavad Gita"
    },
    {
      text: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः। न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥",
      translation: "Weapons do not cleave the soul, fire does not burn it, waters do not wet it, and the wind does not dry it.",
      author: "Bhagavad Gita"
    },
    {
      text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥ ",
      translation: "To work alone you have the right, and not to the fruits. Do not be impelled by the fruits of work. Nor have an attachment to inaction.",
      author: "Bhagavad Gita"
    }
  ];
  isLoading = false;
  returnUrl: string = '/dashboard';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Auto-rotate quotes
    this.startQuoteRotation();
    
    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy(): void {
    // Clear interval when component is destroyed
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval);
    }
  }

  startQuoteRotation(): void {
    this.quoteInterval = setInterval(() => {
      this.currentQuoteIndex = (this.currentQuoteIndex + 1) % 3;
    }, 5000); // Change quote every 5 seconds
  }

  setQuote(index: number): void {
    this.currentQuoteIndex = index;
    
    // Reset the interval when user manually changes quote
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval);
    }
    this.startQuoteRotation();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      
      this.authService.login(credentials)
        .then(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            // Handle login failure
          }
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          // Handle login error
        });
    }
  }
}