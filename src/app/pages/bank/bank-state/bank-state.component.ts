import { Component } from '@angular/core';
import { Institution } from '../../../core/models/institution.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BelvoService } from '../../../core/services/belvo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-state',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './bank-state.component.html',
  styleUrl: './bank-state.component.scss'
})
export class BankStateComponent {
  bankId: number = 0
    bankCurrent: Institution | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private belvoService: BelvoService
    ) {}
  
    ngOnInit(): void {
      this.bankId = Number( this.route.snapshot.paramMap.get('id') );
      this._getDetail();
    }
  
    private _getDetail(){
      
      this.belvoService.getDetailInstitution(this.bankId).subscribe((data: any) => {
        if( data ){
          this.bankCurrent = data;
        }
      });
    }
}