import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [

  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductsListComponent },
  { path: 'category/:id/:name', component: ProductsListComponent },
  { path: 'category', component: ProductsListComponent },
  { path: 'products', component: ProductsListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // 'Full' join all the 'Path' instead of only the prefix
  { path: '**', redirectTo: '/products', pathMatch: 'full' } // ** will match on anything that don't match above routes

];

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService], // Inject my service
  bootstrap: [AppComponent]
})
export class AppModule { }
