import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductDTO } from './product.model';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class LocalProductService {

  private storage: Storage;

  constructor(private snackBar: MatSnackBar) {
    this.storage = window.localStorage;
  }

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  errorHandler(e: any) {
    this.showMessage(`
    Unavailable service at the moment, please try again later`,
      true);
  }

  seed() {
    let products: Product[] = JSON.parse(this.storage.getItem('products')!);
    if (!products) {
      console.log('ertoy no if');
      products = [{
        id: 1,
        name: 'Macbook Pro',
        price: 13500
      }, {
        id: 2,
        name: 'Samartphone Samsung Galaxy',
        price: 3500
      },
      {
        id: 3,
        name: 'Caneta BIC',
        price: 3.50
      }];
      this.storage.setItem('products', JSON.stringify(products));
      return true;
    }
    return false;
  }

  create(product: ProductDTO): boolean {
    if (!product.name || !product.price) {
      this.showMessage(`Every field is required`, true);
      return false;
    }
    const products: Product[] = JSON.parse(this.storage.getItem('products')!);
    const fullProduct = { ...product, id: products.length + 1 };
    products.push(fullProduct);
    this.storage.setItem('products', JSON.stringify(products));
    return true;
  }

  read(): Product[] {
    if (!this.seed())
      return JSON.parse(this.storage.getItem('products')!);
    this.errorHandler(Error);
    return JSON.parse(this.storage.getItem('products')!);
  }

  readyById(id: string) {

  }

  update(product: Product) {

  }

  delete(id: number) {

  }
}
