import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductDTO } from './product.model';
import { LocalStorageService } from 'src/app/helpers/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class LocalProductService {

  constructor(private snackBar: MatSnackBar,
    private storage: LocalStorageService) { }

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
    let products: Product[] = this.storage.get('products');
    if (!products) {
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
      this.storage.set('products', products);
      return true;
    }
    return false;
  }

  create(product: ProductDTO): boolean {
    if (!product.name || !product.price) {
      this.showMessage(`Every field is required`, true);
      return false;
    }
    const products: Product[] = this.storage.get('products');
    const fullProduct = { id: products.length + 1, ...product };
    products.push(fullProduct);
    this.storage.set('products', products);
    return true;
  }

  read(): Product[] {
    if (!this.seed())
      return this.storage.get('products');
    this.errorHandler(Error);
    return this.storage.get('products');
  }

  readById(id: number) {
    const products: Product[] = this.storage.get('products');
    return products[id - 1];
  }

  update(product: Product) {
    const products: Product[] = this.storage.get('products');
    products[product.id! - 1] = product;
    this.storage.set('products', products);
  }

  delete(id: number) {
    const products: Product[] = this.storage.get('products');
    products.splice(id - 1, 1);
    products.map((product, index) => product.id = index+1);
    this.storage.set('products', products);
  }
}
