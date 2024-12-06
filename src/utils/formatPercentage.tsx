export function formatPercentage(
  value: number,
  decimalPlaces: number = 2
): string {
  if (isNaN(value)) {
    return 'Invalid value';
  }

  return `${value.toFixed(decimalPlaces)} %`;
}
