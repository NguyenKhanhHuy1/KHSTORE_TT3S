/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROVINCE_URL, PROVINCE_BY_ID_URL } from 'src/app/demo/constants/urls';
import { Province } from 'src/app/models/province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Province[]> {
    const ProvinceList = this.http.get<Province[]>(PROVINCE_URL);
    console.log(ProvinceList);
    return ProvinceList;
  }
  get(id: any): Observable<Province> {
    return this.http.get<Province>(`${PROVINCE_BY_ID_URL}${id}`);
  }
}
