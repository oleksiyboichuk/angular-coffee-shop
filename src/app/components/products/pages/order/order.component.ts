import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../service/localstorage/localstorage.service';
import { IProduct } from '../../../../shared/models/product.model';
import { CardModule } from 'primeng/card';
import { CartComponent } from '../../components/cart/cart.component';
import { OrderFormComponent } from '../../../../shared/component/order-form/order-form.component';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CardModule,
    CartComponent,
    OrderFormComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  products!: IProduct[];
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products = this.localStorageService.getCartItems().map(item => item.product);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
