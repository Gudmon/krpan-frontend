import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: true
})
export class FormatPricePipe implements PipeTransform {

  transform(price: number | null): string {
    if (price !== null && price !== undefined) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
    } else {
      return '';
    }
  }
}
