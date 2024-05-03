import { Component, OnInit } from '@angular/core';

import { ProductService } from './service/product.service';
import { IProduct } from '../../shared/models/product.model';

import { CardModule } from 'primeng/card';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardModule,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products$: Observable<IProduct[]> = this.productService.getProducts();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }
}
