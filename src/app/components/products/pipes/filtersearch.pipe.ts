import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../shared/models/product.model';

@Pipe({
  standalone: true,
  name: 'filterSearch',
})
export class FilterSearchPipe implements PipeTransform {
  transform(products: IProduct[] | null, searchTerm: string): IProduct[] | null {
    if (!products || !searchTerm) {
      return products;
    }
    searchTerm = searchTerm.toLowerCase();
    return products.filter(product => {
      return product.name.toLowerCase().includes(searchTerm);
    });
  }
}
