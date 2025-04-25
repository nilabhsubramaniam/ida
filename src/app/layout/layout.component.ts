import { Component } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
//import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

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
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
