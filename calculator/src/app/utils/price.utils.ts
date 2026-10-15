export function parsePrice(price: number | string | null | undefined): number {
  if (price === null || price === undefined || price === '') {
    return 0;
  }

  if (typeof price === 'number') {
    if (!Number.isFinite(price)) {
      throw new Error(`Invalid price: ${price}`);
    }

    return price;
  }

  const normalized = price.trim().replace(/[^\d,.-]/g, '');
  if (!normalized) {
    throw new Error(`Invalid price: ${price}`);
  }

  const commaIndex = normalized.lastIndexOf(',');
  const dotIndex = normalized.lastIndexOf('.');
  let decimalSeparator = '';

  if (commaIndex >= 0 && dotIndex >= 0) {
    decimalSeparator = commaIndex > dotIndex ? ',' : '.';
  } else if (commaIndex >= 0) {
    decimalSeparator = ',';
  }

  const decimalIndex = decimalSeparator ? normalized.lastIndexOf(decimalSeparator) : -1;
  const integerPart = decimalIndex >= 0
    ? normalized.slice(0, decimalIndex).replace(/[,.]/g, '')
    : normalized.replace(/[,.]/g, '');
  const fractionPart = decimalIndex >= 0
    ? normalized.slice(decimalIndex + 1).replace(/[,.]/g, '')
    : '';
  const parsed = Number(fractionPart ? `${integerPart}.${fractionPart}` : integerPart);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid price: ${price}`);
  }

  return parsed;
}

export function formatPriceValue(price: number | string | null | undefined): string {
  if (price === null || price === undefined || price === '') {
    return '';
  }

  return `${parsePrice(price).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} €`;
}

export function formatConfigurationPrice(item: { name: string; price: number | string }): string {
  item.price = parsePrice(item.price);
  return `${item.name} ${formatPriceValue(item.price)}`;
}
