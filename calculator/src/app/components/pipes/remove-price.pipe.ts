import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePrice',
  standalone: true
})
export class RemovePricePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    const startIndex = value.indexOf('(');
    const endIndex = value.indexOf(')');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const beforeParentheses = value.slice(0, startIndex).trim();
      const afterParentheses = value.slice(endIndex + 1).trim();

      return beforeParentheses + ' ' + afterParentheses;
    }

    return value;
  }
}
