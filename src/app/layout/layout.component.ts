import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
//import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './../core/services/theme.service'; 


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    TopbarComponent,
    //SidebarComponent,
    FooterComponent,
    //NavbarComponent
  ],
  providers: [ThemeService],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.enableDarkTheme();
  }
}
