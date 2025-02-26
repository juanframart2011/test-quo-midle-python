import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './shared/components/message/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent, HttpClientModule,MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pwa';

  isPWAInstalled = false;

  constructor(public authService: AuthService) {
    /*window.addEventListener('appinstalled', () => {
      this.isPWAInstalled = true;
      console.log('¡PWA instalada!');
    });*/
  }
}