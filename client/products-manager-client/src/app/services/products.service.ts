import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getNextProductId() {
    return this.httpClient.get('http://localhost:5566/api/getNextProductId');
  }
  addNewProduct(productUpdate) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.httpClient.post(
      'http://localhost:5566/api/addProduct',
      JSON.stringify(productUpdate),
      httpOptions
    );
  }

  searchProductByKeyowrd(keyword) {
    return this.httpClient.get(
      'http://localhost:5566/api/getProducts/' + keyword
    );
  }

  updateProductDetails(productId, productObject) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    return this.httpClient.post(
      'http://localhost:5566/api/updateProduct/' + productId,
      JSON.stringify(productObject),
      httpOptions
    );
  }
}
