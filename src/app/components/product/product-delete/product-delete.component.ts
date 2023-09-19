import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductDTO } from '../product.model';
import { ProductService } from '../product.service';
import { LocalProductService } from '../localProduct.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private localProductService: LocalProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id:number = this.route.snapshot.params['id'];
    // this.productService.readById(id).subscribe((product) => {
    //   this.product = product;
    // });
    this.product = this.localProductService.readById(id);
  }

  deleteProduct(): void {
    // this.productService.delete(this.product.id!).subscribe(() => {
    //   this.productService.
    //     showMessage('Product deleted successfully');
    //   this.router.navigate(['/products']);
    // })
    this.localProductService.delete(this.product.id!);
    this.router.navigate(['/products']);
  }

  cancel(): void{
    this.router.navigate(['/products']);
  }
}
