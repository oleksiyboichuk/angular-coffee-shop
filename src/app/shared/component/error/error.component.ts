import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    CardModule,
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {

}
