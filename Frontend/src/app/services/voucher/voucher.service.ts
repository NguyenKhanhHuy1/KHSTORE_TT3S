/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VOUCHER_BY_ID_URL } from 'src/app/demo/constants/urls';
import { Voucher } from 'src/app/models/voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  constructor(private http: HttpClient) {}
  get(id: any): Observable<Voucher> {
    return this.http.get<Voucher>(`${VOUCHER_BY_ID_URL}${id}`);
  }
}
