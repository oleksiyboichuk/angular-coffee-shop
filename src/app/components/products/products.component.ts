import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from './service/product.service';
import { IProduct } from '../../shared/models/product.model';
import { LocalStorageService } from './service/localstorage/localstorage.service';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';

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
  ],
  providers: [
    MessageService
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
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getData();

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['showMessage']) {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
      }
    });
  }

  private getData(): any {
    this.productService.getProducts()
      .subscribe(products => {
        this.products$ = of(products);
        this.isLoading = false;
      });
  }

  addToLiked(event: Event, product: IProduct): void {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.addToLiked(product);
    this.messageService.add({ severity: 'success', summary: `${product.name}`, detail: 'Has been added to the like' });
  }

  addToCart(event: Event, product: IProduct) {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.addToCart(product)
    this.messageService.add({ severity: 'success', summary: `${product.name}`, detail: 'Has been added to the cart' });
  }

  isProductInLiked(product: IProduct): boolean {
    const likedItem = this.localStorageService.getLikedProducts();
    return likedItem.some(item => item.id === product.id);
  }

  isProductInCart(product: IProduct): boolean {
    const cartItems = this.localStorageService.getCartItems();
    return cartItems.some(item => item.product.id === product.id);
  }

  searchProduct(event: Event): void {
    if (event && event.target) {
      const value = (event.target as HTMLInputElement).value.trim();
      if (value === '') {
        this.products$ = this.productService.getProducts()
      }
      if (value.length >= 2) {
        this.products$ = this.productService.getProducts()
          .pipe(
            map(products => products.filter(product => product.name.toLowerCase().includes(value) || product.description.toLowerCase().includes(value)))
          );
      }
    }
  }
}
