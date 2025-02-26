import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../core/services/shared.service';
import { CommonModule } from '@angular/common';

type MessageType = "success-message" | "error-message" | "warning-message";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent  implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  
  classMessage:MessageType = 'success-message';
  message:string = '';
  existMessage: boolean = false;

  constructor(private sharedService:SharedService) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.message$.subscribe({
      next: ({ message, messageType, type }) => { // Asegúrate de incluir '=>' aquí
        if (type == 1) {
          this.showMessage(message,messageType);
        } else {
          this.resetMessage();
        }
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetMessage(){
    this.existMessage = false;
    this.message = '';
  }

  showMessage(message:string,classMessage:MessageType){
    
    this.existMessage = true;
    this.message = message;
    this.classMessage = classMessage;
  }
}