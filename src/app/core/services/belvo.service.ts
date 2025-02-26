import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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

  getListInstitutions(){

    return this.http.get(environment.belvo.url+'/institutions/?page_size=10', { headers: this._getHeaders() });
  }
}