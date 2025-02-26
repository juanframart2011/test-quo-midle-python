import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BelvoService {

  constructor(private http: HttpClient){}

  getListInstitutions(){
    return this.http.get(environment.belvo.url+'/institutions/?page_size=100');
  }
}