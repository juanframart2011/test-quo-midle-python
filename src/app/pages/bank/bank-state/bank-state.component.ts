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

  bank: any = null;
  movements: any[] = [];
  balance: number = 0;
  linkId: string = '';

  bankIdDummy: string = 'planet_mx_employment';
  bankId: number = 0;
  bankCurrent: Institution | null = null;

  accountId: string = '';
  
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
        this.belvoService.getLinks().subscribe({
          next: (linksData) => {
            
            //const link = linksData.find((l: any) => l.institution === this.bankId);
            const link = linksData.results.find((l: any) => l.institution === this.bankIdDummy);
            if (!link) {
              console.error('No hay conexión con el banco');
              this.router.navigate(['/']);
              return;
            }
    
            this.linkId = link.id;
    
            // Obtener las cuentas de este link
            this.belvoService.getAccounts(this.linkId).subscribe({
              next: (accountsData) => {
                if (accountsData.length === 0) {
                  console.error('No hay cuentas asociadas a este banco');
                  return;
                }
    
                this.accountId = accountsData[0].id; // Tomamos la primera cuenta
                
                this._getTransactions(true);
              },
              error: (err) =>{
                this._getTransactions(false);
                console.error('Error obteniendo cuentas:', err);
              }
            });
          },
          error: (err) => console.error('Error obteniendo enlaces:', err)
        });
        this._registerLink();
      }
    });
  }

  private _getMovements(){

    this.belvoService.retrieveAccounts(this.linkId).subscribe({
      next: (accountsData) => {
        const accounts = accountsData;
        // Ahora puedes usar las cuentas para obtener transacciones
      },
      error: (err) => console.error('Error al obtener las cuentas:', err)
    });

    const startDate = '2023-01-01'; // Fecha de inicio en formato YYYY-MM-DD
    const endDate = '2023-12-31';   // Fecha de fin en formato YYYY-MM-DD

    /*this.belvoService.retrieveTransactions(this.linkId, accountId, startDate, endDate).subscribe({
      next: (transactionsData) => {
        const transactions = transactionsData;
        // Ahora puedes mostrar las transacciones en tu vista
      },
      error: (err) => console.error('Error al obtener las transacciones:', err)
    });*/
  }

  _calculateBalance(): void {
    let ingresos = 0;
    let egresos = 0;

    this.movements.forEach(movement => {
      if (movement.type === 'Ingreso') {
        ingresos += movement.amount;
      } else if (movement.type === 'Egreso') {
        egresos += movement.amount;
      }
    });

    this.balance = ingresos - egresos;
  }

  private _registerLink(){
    
    this.belvoService.registerLink(this.bankCurrent?.name||'').subscribe((data: any) => {
      
      this.linkId = data.id;
      //this._getMovements();
    });
  }

  private _getTransactions(isPost:boolean){

    // Obtener movimientos
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';

    this.belvoService.getTransactions(this.linkId, this.accountId, startDate, endDate,isPost).subscribe({
      next: (transactionsData) => {
        this.movements = transactionsData;
        this._calculateBalance();
      },
      error: (err) => console.error('Error obteniendo movimientos:', err)
    });
  }
}