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
  
  repassword: string = '';
  user:User = {
    password: '',
    email: '',
    name: '',
    last_name: '',
    rol_id: 1
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
      this.userService.create(this.user).subscribe(
        response => {
          
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('name', this.user.name);
          localStorage.setItem('last_name', this.user.last_name);
          localStorage.setItem('rol', this.user.rol_id.toString());
          
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
    if ( !this.user.email || !this.user.password) {
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