import { Component, Input } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [
  ],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  @Input() buttonText?: string

  constructor(
    private location: Location,
  ) {}

  goBack(): void {
   this.location.back();
  }

}
