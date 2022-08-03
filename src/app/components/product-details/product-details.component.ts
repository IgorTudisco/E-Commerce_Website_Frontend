import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  /*
    Using this way the (product: Product = new Product();)
    is the same as using this (product?: Product;)
  */

  product?: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })

  }

  handleProductDetails() {

    // get the "id" param string. Convert string to a using Number()
    const theProdutcId: Number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(theProdutcId).subscribe(
      data => {
        this.product = data;
      }
    )

  }

}
