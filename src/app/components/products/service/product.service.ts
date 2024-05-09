import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://fake-coffee-api.vercel.app/api?limit=3';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  getProductsById(id: number): Observable<IProduct[]> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IProduct[]>(url);
  }
}
