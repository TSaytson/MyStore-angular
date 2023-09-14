import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductDTO } from './product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products';
  MAX_NAME_LENGTH = 15;

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient, private router: Router) { }

  showMessage(message: string):void {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product: ProductDTO):Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readyById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(
      `${this.baseUrl}/${product.id}`, product);
  }

  delete(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.baseUrl}/${id}`)
  }
}
