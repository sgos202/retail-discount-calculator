import taxRates from "./taxRates"; // Import tax rates
import discountRates from "./discountRates"; // Import discount rates

const calculateTotal = (items, price, region) => {
  // Convert the inputs to numbers
  const numItems = Number(items);
  const numPrice = Number(price);

  // Validate the inputs
  if (isNaN(numItems) || isNaN(numPrice) || numItems < 0 || numPrice < 0) {
    return { error: "Please enter valid numbers for items and price" };
  }

  if (!region) {
    return { error: "Please enter a region code" };
  }

  // Calculate the subtotal
  let subtotal = numItems * numPrice;

  // Apply the discount rate based on the subtotal
  let discountRate = 0;
  for (let i = 0; i < discountRates.length; i++) {
    if (subtotal >= discountRates[i].orderValue) {
      discountRate = discountRates[i].discountRate;
      break;
    }
  }

  let discount = subtotal * discountRate;
  subtotal -= discount;

  // Apply the tax rate based on the region
  const taxRate = taxRates[region.toUpperCase()];

  if (taxRate === undefined) {
    return { error: "Please enter a valid region code" };
  }

  let tax = subtotal * taxRate;
  subtotal += tax;

  return { total: subtotal.toFixed(2) };
};

export { calculateTotal };