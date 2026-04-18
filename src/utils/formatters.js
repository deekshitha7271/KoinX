export const formatCurrency = (value) => {
  if (value === 0) return '0';
  if (Math.abs(value) > 0 && Math.abs(value) < 0.00000001) {
    return '0'; // extremely small, just return 0
  }
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(value);
};

export const formatCurrencyWithCents = (value) => {
  // Allow up to 8 decimal places for very small fiat amounts, but keep 2 as minimum
  const maxDigits = (Math.abs(value) < 0.01 && value !== 0) ? 8 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDigits,
  }).format(value);
};

export const formatCompactCurrency = (value) => {
  // If the value is microscopic, don't use compact notation because it restricts to 2 decimals and outputs $0
  if (Math.abs(value) < 0.01 && value !== 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(value);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
};
