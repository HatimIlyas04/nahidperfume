// Business rule: delivery is always included in the pack price -- there is
// no separate shipping charge, ever. Mirrors backend orderService's
// hardcoded computeShipping(). Kept as one shared constant so Cart,
// Checkout, and HomeOrderForm can never drift from each other or from
// what the backend will actually charge.
export const SHIPPING_FEE = 0;

// Fallback promotional price shown on the Thank You page's post-order
// upsell offer when a pack is flagged as an upsell but has no explicit
// upsell_price override. Mirrors backend orderService's DEFAULT_UPSELL_PRICE.
export const DEFAULT_UPSELL_PRICE = 150;
