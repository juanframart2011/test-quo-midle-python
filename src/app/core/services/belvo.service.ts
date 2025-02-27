import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BelvoService {

  constructor(private http: HttpClient){}

  private _getHeaders(): HttpHeaders {
    const auth = btoa(`${environment.belvo.secretId}:${environment.belvo.secretPassword}`);
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    });
  }

  getDetailInstitution(institutionId: number){

    return this.http.get(environment.belvo.url+'/institutions/'+institutionId, { headers: this._getHeaders() });
  }

  getListInstitutions(){

    return this.http.get(environment.belvo.url+'/institutions/?page_size=10&country_code=MX', { headers: this._getHeaders() });
  }
  
  getMovements(institutionId: number){

    return this.http.get(environment.belvo.url+'/institutions/'+institutionId+'/movements', { headers: this._getHeaders() });
  }
  
  registerLink(institution:string){
    const body = JSON.stringify({
      access_mode: 'recurrent',
      //institution: institution,
      institution: 'planet_mx_employment',
      username: 'BLPM951331IONVGR54',
      username2: localStorage.getItem('email'),
    });

    return this.http.post(environment.belvo.url+'/links/', body, { headers: this._getHeaders() });
  }

  retrieveAccounts(linkId: string): Observable<any> {
    const body = { link: linkId };

    return this.http.post(environment.belvo.url+'/accounts/', body, { headers: this._getHeaders() });
  }

  retrieveTransactions(linkId: string, accountId: string, startDate: string, endDate: string): Observable<any> {
    const body = {
      link: linkId,
      account: accountId,
      date_from: startDate,
      date_to: endDate
    };
    
    return this.http.post(environment.belvo.url+'/transactions/', body, { headers: this._getHeaders() });
  }


  // Obtener los enlaces (Links) del usuario
  getLinks(): Observable<any> {
    return this.http.get(`${environment.belvo.url}/links/`, { headers: this._getHeaders() });
  }

  // Obtener las cuentas de un Link
  getAccounts(linkId: string): Observable<any> {
    return this.http.post(`${environment.belvo.url}/accounts/`, { link: linkId }, { headers: this._getHeaders() });
  }

  // Obtener las transacciones de una cuenta
  getTransactions(linkId: string, accountId: string, startDate: string, endDate: string, isPost:boolean): Observable<any> {

    if(isPost){

      const body = {
        link: linkId,
        account: accountId,
        date_from: startDate,
        date_to: endDate
      };
      return this.http.post(`${environment.belvo.url}/transactions/`, body, { headers: this._getHeaders() });
    }
    else{

      return this.http.get(`${environment.belvo.url}/transactions/?link=${linkId}&page_size=100`, { headers: this._getHeaders() });
    }    
  }
}