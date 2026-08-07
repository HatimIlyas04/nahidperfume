const couponCodesRepo = require('../db/couponCodesRepo');
const AppError = require('../utils/AppError');

function computeDiscount(coupon, subtotal) {
  if (coupon.discount_type === 'percent') {
    return Math.round(((subtotal * Number(coupon.discount_value)) / 100) * 100) / 100;
  }
  return Math.min(Number(coupon.discount_value), subtotal);
}

/** Read-only preview used by the checkout page before the order is submitted. */
async function previewCoupon(code, subtotal) {
  const coupon = await couponCodesRepo.findByCode(String(code).trim().toUpperCase());
  if (!coupon) throw new AppError('Invalid coupon code', 404);
  if (!coupon.is_active) throw new AppError('This coupon is no longer active', 400);
  if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) {
    throw new AppError('This coupon is not active yet', 400);
  }
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    throw new AppError('This coupon has expired', 400);
  }
  if (coupon.max_uses !== null && coupon.used_count >= coupon.max_uses) {
    throw new AppError('This coupon has reached its usage limit', 400);
  }
  if (coupon.min_order_amount && subtotal < Number(coupon.min_order_amount)) {
    throw new AppError(`This coupon requires a minimum order of ${coupon.min_order_amount} MAD`, 400);
  }

  return { coupon, discount: computeDiscount(coupon, subtotal) };
}

/** Must run inside the order's transaction — atomically claims one use. */
async function reserveCoupon(couponId, conn) {
  const reserved = await couponCodesRepo.reserveUse(couponId, conn);
  if (!reserved) {
    throw new AppError('This coupon is no longer available (expired, inactive, or fully used)', 409);
  }
}

module.exports = { previewCoupon, reserveCoupon, computeDiscount };
