import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  projectTitle:string = 'QUO Test Pyhton Midle';

  constructor(private router: Router,
    private authService: AuthService) {}

  logout(){

    this.authService.logout();
  }
}