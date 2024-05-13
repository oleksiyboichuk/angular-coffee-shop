import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../../../components/products/components/cart/cart.component';

import { LocalStorageService } from '../../../components/products/service/localstorage/localstorage.service';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { IProduct } from '../../models/product.model';


@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [
    CartComponent,
    RouterLink,
    DialogModule,
  ],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent implements OnInit {
  visible: boolean = false;
  count: number = this.localStorageService.calcTotalQuantity();
  likedCount: number = this.localStorageService.getLikedProducts().length;
  products: IProduct[] = this.localStorageService.getCartItems();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.localStorageService.likedProductsChanged.subscribe(() => {
      this.likedCount = this.localStorageService.getLikedProducts().length;

    });
    this.localStorageService.cartItemsChanged.subscribe(() => {
      this.count = this.localStorageService.calcTotalQuantity();
      this.products = this.localStorageService.getCartItems();
      if (this.products.length === 0) {
        this.visible = false;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  goToOrder() {
    this.router.navigate(['/order']);
    this.visible = false;
  }

  clearCart(): void {
    this.localStorageService.clearCart();
  }

}
