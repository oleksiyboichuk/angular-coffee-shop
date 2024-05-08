import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from './service/product.service';
import { IProduct } from '../../shared/models/product.model';

import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from './service/localstorage/localstorage.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    AsyncPipe,
    RouterLink,
    ProgressSpinnerModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  isLoading: boolean = true;
  disabled: boolean = false;

  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products$ = of(products);
        this.isLoading = false;
      })
  }

  addToLiked(event: Event, product: IProduct): void {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.addToLiked(product);
  }

  addToCart(event: Event, product: IProduct) {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.addToCart(product);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully!' });
  }

  isProductInLiked(product: IProduct): boolean {
    const likedItem = this.localStorageService.getLikedProducts();
    return likedItem.some(item => item.id === product.id);
  }

  isProductInCart(product: IProduct): boolean {
    const cartItems = this.localStorageService.getCartItems();
    return cartItems.some(item => item.product.id === product.id);
  }
}
