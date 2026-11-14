/**
 * Format a number as standard US Currency ($145,200.00)
 */
export function formatCurrency(amount: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Format large numbers in compact human-readable notation (e.g., $1.4M, 100k)
 */
export function formatCompactNumber(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(amount);
}

/**
 * Format ISO date string to localized date (YYYY-MM-DD)
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toISOString().slice(0, 10);
  } catch {
    return dateString;
  }
}

/**
 * Format margin as percentage (e.g. 34.5%)
 */
export function formatPercentage(val: number): string {
  return `${val.toFixed(1)}%`;
}
