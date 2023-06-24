import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @summary Check whether the same discount code is already applied to a cart
 * @param {Object} discount - Discount to add to cart
 * @param {Object} cart - Cart to check against
 * @returns {void} throws error if code is already applied
 */
export default function ensureDiscountCodeIsNotAlreadyApplied(discount, cart) {
  if (!cart.billing) return;

  const match = cart.billing.find((billing) =>
    billing.name === "discount_code" &&
    billing.data &&
    billing.data.discountId === discount._id);

  if (match) throw new ReactionError("discount-error", `Code ${discount.code} is already applied to cart`);
}
