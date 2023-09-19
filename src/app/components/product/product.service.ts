import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductDTO } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(message: string, isError: boolean = false):void {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage(`An error occurred`, true);
    return EMPTY;
  }

  create(product: ProductDTO):Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(object => object),
      catchError((error) => this.errorHandler(error))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(object => object),
      catchError((error) => this.errorHandler(error))
    );
  }

  readById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map(object => object),
      catchError((error) => this.errorHandler(error))
    );
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(
      `${this.baseUrl}/${product.id}`, product).pipe(
        map(object => object),
        catchError((error) => this.errorHandler(error))
      );
  }

  delete(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).pipe(
      map(object => object),
      catchError((error) => this.errorHandler(error))
    );
  }
}
