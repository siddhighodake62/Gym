/**
 * Formats a numeric amount into Indian Rupees (₹) with proper Indian comma placement.
 * e.g., 1499 -> ₹1,499
 *       12999 -> ₹12,999
 *       150000 -> ₹1,50,000
 * @param {number} amount 
 * @returns {string}
 */
export const formatRupees = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  
  // Format with Indian locale for comma-separated currency values
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);
  
  return `₹${formatted}`;
};
