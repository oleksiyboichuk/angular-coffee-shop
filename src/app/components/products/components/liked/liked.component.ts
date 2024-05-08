import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../service/localstorage/localstorage.service';
import { CardModule } from 'primeng/card';
import { IProduct } from '../../../../shared/models/product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [
    CardModule,
    RouterLink
  ],
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.scss'
})
export class LikedComponent implements OnInit {
  likedProducts!: IProduct[];

  constructor(
    private localStorageService: LocalStorageService,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getLikedProducts();


  }

  getLikedProducts() {
    this.likedProducts = this.localStorageService.getLikedProducts();
  }

  removeFromLiked(event: Event, id: number) {
    event.preventDefault();
    event.stopPropagation();
    this.localStorageService.removeFromLiked(id)
    this.getLikedProducts();
    if (this.likedProducts.length === 0) {
      this.router.navigate(['/products']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
