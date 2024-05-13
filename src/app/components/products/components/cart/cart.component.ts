import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/localstorage/localstorage.service';
import { IProduct } from '../../../../shared/models/product.model';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  products!: IProduct[];
  count: any = {};
  totalPrice: number = this.localStorageService.calcTotalPrice();
  private cartSubscription!: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.cartSubscription = this.localStorageService.cartItemsChanged.subscribe(() => {
      this.getProducts();
      this.calculateTotalPrice();

    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  getProducts(): void {
    this.localStorageService.getCartItems().forEach(item => {
      this.count[item.product.id] = item.count;
    })
    this.products = this.localStorageService.getCartItems().map(item => item.product);
  }

  plusCart(id: number) {
    this.localStorageService.increaseCartItemQuantity(id);
  }

  minusCart(id: number) {
    this.localStorageService.decreaseCartItemQuantity(id);
  }

  removeFromCart(id: number) {
    this.localStorageService.removeAllItemsById(id);
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.localStorageService.calcTotalPrice();
  }
}
