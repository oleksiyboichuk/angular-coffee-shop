import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/models/product.model';
import { AsyncPipe, JsonPipe, Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LocalStorageService } from '../../service/localstorage/localstorage.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    AsyncPipe,
    JsonPipe,
    DialogModule,
    InputTextModule,
    ProgressSpinnerModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  id!: number;
  product$!: Observable<IProduct[]>;
  visible: boolean = false;
  currentImg: string = '';
  isLoading: boolean = true;
  buttonActive: boolean = true;
  addToCartButtonState: string = 'Add to cart';

  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.id = +this.route.snapshot.params['id'];
    this.productService.getProductsById(this.id)
      .subscribe(product => {
        this.product$ = of(product);
        this.isLoading = false;
      })
  }

  addToCart(product: IProduct) {
    this.localStorageService.addToCart(product);
    this.addToCartButtonState = 'Already in cart';
    this.buttonActive = false;
  }

  orderProducts() {
    this.router.navigate(['/order'])
  }

  showModal(img: string): void {
    this.visible = true;
    this.currentImg = img;
  }

  closeModal(): void {
    this.visible = false;
  }

  goBack(): void {
    this.location.back();
  }

  isProductInCart(product: IProduct): boolean {
    const cartItems = this.localStorageService.getCartItems();
    return cartItems.some(item => item.product.id === product.id);
  }
}
