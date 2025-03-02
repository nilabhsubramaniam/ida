import { Component } from '@angular/core';
import {TopbarComponent} from './components/topbar/topbar.component'
@Component({
  selector: 'app-welcome',
  imports: [TopbarComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
