import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name discounts/codes/discount
 * @method
 * @memberof Discounts/Codes/Methods
 * @summary calculates percentage off discount rates
 * @param {String} cart updated cart
 * @param {String} discountMethod discountId
 * @returns {Number} returns discount total
 */
export default async function getPercentageOffDiscount(cart, discountMethod) {
  // For "discount" type discount, the `discount` string is expected to parse as a float, a percent
  const discountAmount = Number(discountMethod.discount);
  if (isNaN(discountAmount)) throw new ReactionError("invalid", `"${discountMethod.discount}" is not a number`);

  if (!cart) throw new ReactionError("not-found", "Cart not found");

  let discount = 0;
  for (const item of cart.items) {
    discount += item.subtotal.amount * discountAmount / 100;
  }

  return discount;
}
