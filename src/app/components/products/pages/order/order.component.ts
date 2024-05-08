import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/localstorage/localstorage.service';
import { IProduct } from '../../../../shared/models/product.model';
import { CardModule } from 'primeng/card';
import { CartComponent } from '../../components/cart/cart.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CardModule,
    CartComponent
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
