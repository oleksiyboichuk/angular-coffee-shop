import { Component, OnInit } from '@angular/core';

import { ProductService } from './service/product.service';
import { IProduct } from '../../shared/models/product.model';

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
    private localStorageService: LocalStorageService
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
    this.disabled = true;
  }

  addToCart(event: Event, product: IProduct) {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.addToCart(product);
    this.disabled = true;
  }
}
