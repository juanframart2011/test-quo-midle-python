import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss'
})
export class RecoveryComponent {

  username: string = '';
  showSuccessMessage = false;
  successMessage = '';
  showErrorMessage = false;
  errorMessage = '';
  showWarningMessage = false;
  warningMessage = '';
  buttonText:string = 'Enviar Correo';
  validateRecovery:boolean = false;

  constructor(private router: Router, private userService:UserService) { }

  cancel(){
    this.router.navigate(['/login']);
  }

  recoverPassword() {
    this.validateRecovery = true;
    this.buttonText = 'Validando...';
    if (!this.username) {
      this.showWarningMessage = true;
      this.warningMessage = 'Todos los campos son obligatorios';
      setTimeout(() => {
        this.showWarningMessage = false;
      }, 5000);

      this.validateRecovery = false;
      this.buttonText = 'Enviar Correo';

      return;
    }

    this.userService.recovery(this.username).subscribe(
      (response) => {
        this.showSuccessMessage = true;
        this.successMessage = 'Correo Eléctronico enviado exitosamente';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
        this.username = '';
        this.validateRecovery = false;
        this.buttonText = 'Enviar Correo';
      },
      (error) => {
        this.showErrorMessage = true;

          this.errorMessage = error;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 10000);
          this.validateRecovery = false;
          this.buttonText = 'Enviar Correo';
      }
    );
  }
}