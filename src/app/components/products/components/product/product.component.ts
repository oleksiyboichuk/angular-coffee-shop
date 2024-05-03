import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/models/product.model';
import { AsyncPipe, JsonPipe, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


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
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  id!: number;
  product$!: Observable<IProduct[]>;
  visible: boolean = false;
  currentImg: string = '';


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.id = +this.route.snapshot.params['id'];
    console.log(this.id);
    this.product$ = this.productService.getProductsById(this.id);
    console.log(this.product$);
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

  protected readonly console = console;
}
