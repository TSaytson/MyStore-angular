import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from '../product.model';
import { ProductService } from '../product.service';
import { LocalProductService } from '../localProduct.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  product: ProductDTO = {
    name: '',
    price: null
  }

  constructor(private productService: ProductService,
    private localProductService: LocalProductService,
    private router: Router) { }

  createProduct(): void {
    // this.productService.create(this.product).subscribe(() => {
    //   this.productService.showMessage(
    //     `${this.product.name} successfully registered`
    //   );
    //   this.router.navigate(['/products'])
    // })
    if (this.localProductService.create(this.product))
      this.router.navigate(['/products']);
  }
  cancel(): void {
    this.router.navigate(['/products'])
  }
}
