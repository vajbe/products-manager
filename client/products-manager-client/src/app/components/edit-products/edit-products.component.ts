import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent implements OnInit {
  productForm = new FormGroup({
    product_id: new FormControl(),
    quantity: new FormControl(),
    product_name: new FormControl(),
    cost_price: new FormControl(),
    selling_price: new FormControl(),
  });
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.updateProductIdInForm();
  }

  submitForm() {
    const productUpdate = this.productForm.getRawValue();
    this.productsService.addNewProduct(productUpdate).subscribe((res) => {
      alert('Product has been added');
      this.productForm.reset();
      this.updateProductIdInForm();
    });
  }
  updateProductIdInForm() {
    this.productsService.getNextProductId().subscribe((res: any) => {
      const productId = res.productId;
      this.productForm.controls['product_id'].disable();
      this.productForm.patchValue({
        product_id: productId,
      });
    });
  }
}
