import { Component } from '@angular/core';
import { BelvoService } from '../../core/services/belvo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  institutions: any = [];

  constructor(private belvoService:BelvoService) {}

  ngOnInit(): void {
    this._getInstitutions();
  }

  private _getInstitutions(){
    this.belvoService.getListInstitutions().subscribe((data: any) => {
      
      if( data.results.length > 0 ){
        this.institutions = data.results;
      }
    });
  }
}