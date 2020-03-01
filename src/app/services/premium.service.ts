import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  environmentUrl = 'localhost:3000'

  constructor(private http: HttpClient) { }

  getPremium(dob, state, age) {
    return this.http.get(this.environmentUrl + '/premium', { params: { dob: dob, state: state, age: age } });
  }
}
