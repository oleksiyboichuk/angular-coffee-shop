import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../../../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  cartItemsChanged = new Subject<void>();
  likedProductsChanged = new Subject<void>();

  addToCart(product: IProduct) {
    const cartItems = this.getCartItems();
    const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].count++;
    } else {
      cartItems.push({count: 1, product});
    }
    this.setCartItems(cartItems);
    this.cartItemsChanged.next();
  }

  getCartItems(): any[] {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      return JSON.parse(cartString);
    }
    return [];
  }

  setCartItems(cartItems: any[]) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  removeFromCart(productId: number) {
    const cartItems = this.getCartItems();
    const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
    this.setCartItems(updatedCartItems);
    this.cartItemsChanged.next();
  }

  increaseCartItemQuantity(productId: number) {
    const cartItems = this.getCartItems();
    const existingItemIndex = cartItems.findIndex(item => item.product.id === productId);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].count++;
      this.setCartItems(cartItems);
      this.cartItemsChanged.next();
    }
  }

  decreaseCartItemQuantity(productId: number) {
    const cartItems = this.getCartItems();
    const existingItemIndex = cartItems.findIndex(item => item.product.id === productId);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].count--;
      if (cartItems[existingItemIndex].count === 0) {
        cartItems.splice(existingItemIndex, 1);
      }
      this.setCartItems(cartItems);
      this.cartItemsChanged.next();
    }
  }

  removeAllItemsById(productId: number) {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter(item => item.product.id !== productId);
    this.setCartItems(cartItems);
    this.cartItemsChanged.next();
  }

  calcTotalQuantity(): number {
    const cartItems = this.getCartItems();

    return cartItems.reduce((total, item) => total + item.count, 0);
  }

  calcTotalPrice(): number {
    const cartItems = this.getCartItems();

    const totalPrice = cartItems.reduce((totalPrice, item) => {
      const productPrice = item.product.price;
      return totalPrice + (productPrice * item.count);
    }, 0);

    return Number(totalPrice.toFixed(2));
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItemsChanged.next();
  }

  //###################   LIKED  ###################

  addToLiked(product: IProduct): void {
    let likedProducts: IProduct[] = this.getLikedProducts();
    const existingProduct = likedProducts.find(p => p.id === product.id);
    if (!existingProduct) {
      likedProducts.push(product);
      this.setLikedProducts(likedProducts);
      this.likedProductsChanged.next();
    }
  }

  removeFromLiked(productId: number): void {
    let likedProducts: IProduct[] = this.getLikedProducts();
    likedProducts = likedProducts.filter(p => p.id !== productId);
    this.setLikedProducts(likedProducts);
    this.likedProductsChanged.next();
  }

  clearLiked(): void {
    localStorage.removeItem('liked');
    this.likedProductsChanged.next();
  }

  getLikedProducts(): IProduct[] {
    const likedString = localStorage.getItem('liked');
    if (likedString) {
      return JSON.parse(likedString);
    }
    return [];
  }

  private setLikedProducts(likedProducts: IProduct[]): void {
    localStorage.setItem('liked', JSON.stringify(likedProducts));
  }
}
