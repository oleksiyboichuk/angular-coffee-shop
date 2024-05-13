import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable, of, map } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { ProductService } from './service/product.service';
import { IProduct } from '../../shared/models/product.model';
import { LocalStorageService } from './service/localstorage/localstorage.service';
import { FilterSearchPipe } from './pipes/filtersearch.pipe';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    AsyncPipe,
    RouterLink,
    ProgressSpinnerModule,
    InputTextModule,
    ToastModule,
    NgOptimizedImage,
    FilterSearchPipe,
    FormsModule,
    PaginatorModule,
  ],
  providers: [
    MessageService,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  isLoading: boolean = true;
  disabled: boolean = false;
  searchTerm: string = '';

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getData();

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['showMessage']) {
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
      }
    });
  }

  private getData(): any {
    this.productService.getProducts()
      .subscribe(products => {
        this.totalRecords = products.length;
        this.products = products.slice(this.first, this.first + this.rows);
        this.isLoading = false;
      });
  }

  addToLiked(event: Event, product: IProduct): void {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.addToLiked(product);
    this.messageService.add({severity: 'success', summary: `${ product.name }`, detail: 'Has been added to the like'});
  }

  addToCart(event: Event, product: IProduct) {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.addToCart(product);
    this.messageService.add({severity: 'success', summary: `${ product.name }`, detail: 'Has been added to the cart'});
  }

  isProductInLiked(product: IProduct): boolean {
    const likedItem = this.localStorageService.getLikedProducts();
    return likedItem.some(item => item.id === product.id);
  }

  isProductInCart(product: IProduct): boolean {
    const cartItems = this.localStorageService.getCartItems();
    return cartItems.some(item => item.product.id === product.id);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.getData();
  }

}
