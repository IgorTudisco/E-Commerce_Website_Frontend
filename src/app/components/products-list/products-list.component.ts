import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list-grid.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products?: Product[];
  currentCategoryId?: number;
  previousCategoryId: number = 1;
  //productCategories?: ProductCategory[];
  currentCategoryName?: string;
  searchMode?: boolean;

  // New properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {

      this.handleSearchProducts();

    } else {

      this.handleListProducts();

    }

  };

  handleSearchProducts() {

    const theKeyword: string | null = this.route.snapshot.paramMap.get("keyword");

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword!).subscribe(
      data => {
        this.products = data;
      }
    )

  }

  handleListProducts() {

    // Check if "id" parameter id available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {

      // Get the "id" param  string. Convert string to a number using the "Number()" because this construct accepts any value
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get("id"));

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;

    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // Check if We have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    // Then set thePageNumber to one
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // Now get the products for the given category id
    this.productService.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId
    ).subscribe(this.processResult());

  }

  processResult() {

    return (data: any) => {
      this.products = data._embedded.product;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }

  }

}
