import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BelvoService } from '../../../core/services/belvo.service';
import { Institution } from '../../../core/models/institution.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './bank-detail.component.html',
  styleUrl: './bank-detail.component.scss'
})
export class BankDetailComponent {
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