import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showErrorMessage = false;
  errorMessage = '';
  validateLogin:boolean = false;
  buttonText:string = 'Iniciar Sesión';

  constructor(private router: Router,
              private authService: AuthService) {
                if (this.authService.isAuthenticatedUser()) {
                  this.router.navigate(['/home']);
                }
              }

  login() {
    this.validateLogin = true;
    this.buttonText = 'Validando';
    // Validar los campos antes de enviar la solicitud
    if (this._validateForm()) {
      this.authService.login(this.username, this.password).subscribe(
        response => {
          
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('name', response.name);
          localStorage.setItem('last_name', response.last_name);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('id', response.id);
          this.authService.isAuthenticated = true;
          this.router.navigate(['/home']);
        },
        error => {
          this.validateLogin = false;
          this.showErrorMessage = true;
          this.errorMessage = error;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 10000);
          this.buttonText = 'Iniciar Sesión';
        }
      );
    } else {
      this.validateLogin = false;
      this.buttonText = 'Iniciar Sesión';
    }
  }

  restore(){
    this.router.navigate(['/auth/restore'])
  }

  private _validateForm(): boolean {
    if (!this.username || !this.password) {
      this.showErrorMessage = true;
      this.errorMessage = 'Todos los campos deben estar llenos.';
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 10000);

      return false;
    }
  
    // Todos los campos están llenos y el correo electrónico es válido
    return true;
  }
}