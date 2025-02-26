import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/models/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  password: string = '';
  repassword: string = '';
  user:User = {
    username: '',
    email: '',
    name: '',
    last_name: '',
    rol: 1
  }
  showErrorMessage = false;
  errorMessage = '';
  validateRegister:boolean = false;
  buttonText:string = 'Registrarse';

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService) {
              }

  register() {
    this.validateRegister = true;
    this.buttonText = 'Validando';
    // Validar los campos antes de enviar la solicitud
    if (this._validateForm()) {
      this.userService.create(this.user.username, this.password).subscribe(
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
          this.validateRegister = false;
          this.showErrorMessage = true;
          this.errorMessage = error;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 10000);
          this.buttonText = 'Registrarse';
        }
      );
    } else {
      this.validateRegister = false;
      this.buttonText = 'Registrarse';
    }
  }

  restore(){
    this.router.navigate(['/auth/restore'])
  }

  private _validateForm(): boolean {
    if (!this.user.username || !this.user.email || !this.password) {
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