import { Pipe, PipeTransform } from '@angular/core';
import { formatPriceValue } from '../../utils/price.utils';

@Pipe({
  name: 'formatPrice',
  standalone: true
})
export class FormatPricePipe implements PipeTransform {

  transform(price: number | string | null | undefined): string {
    return formatPriceValue(price);
  }
}
