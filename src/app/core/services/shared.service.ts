import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

type MessageType = "success-message" | "error-message" | "warning-message";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private dataToShare: any;

  private messageSource = new Subject<{ message: string, messageType: MessageType, type:number }>();
  message$ = this.messageSource.asObservable();

  setData(data: any) {
    this.dataToShare = data;
  }

  getData() {
    return this.dataToShare;
  }

  handleErrorResponse(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      //errorMessage = `Código de error: ${error.status}, Mensaje: ${error.error.message}`;
      errorMessage = `${error.error.message}`;
    }
    
    return throwError(errorMessage);
  }

  messageComponent(message:string,messageType:MessageType, type:number){
    this.messageSource.next({ message, messageType, type });
  }
}