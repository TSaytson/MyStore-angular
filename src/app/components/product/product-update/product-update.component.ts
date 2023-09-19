import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { LocalProductService } from '../localProduct.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  product: Product = {
    name: '',
    price: null
  };

  constructor(private productService: ProductService,
    private localProductService: LocalProductService,
    private router: Router,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    // this.productService.readyById(id)
    //   .subscribe((product) => {
    //   this.product = product
    // })
    this.product = this.localProductService.readById(id);
  }
  updateProduct(): void {
    // this.productService.update(this.product)
    //   .subscribe(() => {
    //     this.productService
    //       .showMessage('Product successfully updated');
    //     this.router.navigate(['/products']);
    // });
    this.localProductService.update(this.product);
    this.router.navigate(['/products']);
  }

  cancel():void {
    this.router.navigate(['/products'])
  }
}
