import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [

  { path: 'category/:id', component: ProductsListComponent },
  { path: 'category', component: ProductsListComponent },
  { path: 'products', component: ProductsListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // 'Full' join all the 'Path' instead of only the prefix
  { path: '**', redirectTo: '/products', pathMatch: 'full' } // ** will match on anything that don't match above routes

];

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService], // Inject my service
  bootstrap: [AppComponent]
})
export class AppModule { }
