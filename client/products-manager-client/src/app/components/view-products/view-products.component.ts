import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  productForm = new FormGroup({
    product_id: new FormControl(),
    quantity: new FormControl(),
    product_name: new FormControl(),
    cost_price: new FormControl(),
    selling_price: new FormControl(),
  });
  products: any = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.disableControls();
  }
  submitForm() {
    const productUpdate = this.productForm.getRawValue();
    if (this.validateProductDetails(productUpdate)) {
      return;
    } else {
      this.productsService
        .updateProductDetails(productUpdate.product_id, productUpdate)
        .subscribe((res) => {
          alert('Product has been updated.');
        });
    }
  }
  disableControls() {
    this.productForm.controls['product_id'].disable();
    this.productForm.controls['cost_price'].disable();
    this.productForm.controls['quantity'].disable();
  }

  searchByCriteria(searchKeyword) {
    this.productsService
      .searchProductByKeyowrd(searchKeyword)
      .subscribe((res) => {
        this.products = res;
      });
  }

  showData(item) {
    let productObject = undefined;
    for (let i = 0; i < this.products.length; i++) {
      if (item === this.products[i].product_name) {
        productObject = this.products[i];
        break;
      }
    }

    if (productObject) {
      this.productForm.patchValue({
        product_name: productObject.product_name,
        product_id: productObject.product_id,
        selling_price: productObject.selling_price,
        cost_price: productObject.cost_price,
        quantity: productObject.quantity,
      });
    } else {
      this.productForm.patchValue({
        product_name: '',
        product_id: '',
        selling_price: '',
        cost_price: '',
        quantity: '',
      });
    }
  }
  validateProductDetails(productDetails) {
    if (!/^[a-z0-9]+$/i.test(productDetails.product_name)) {
      alert('Product name should be alphanumeric');
      return false;
    }
    return true;
  }
}
