import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name discounts/codes/credit
 * @method
 * @memberof Discounts/Codes/Methods
 * @summary calculates a credit off cart for discount codes
 * @param {String} _ unused - cart
 * @param {String} discountMethod discount
 * @returns {Number} returns discount total
 */
export default async function getCreditOffDiscount(_, discountMethod) {
  // For "credit" type discount, the `discount` string is expected to parse as a float
  const discountAmount = Number(discountMethod.discount);
  if (isNaN(discountAmount)) throw new ReactionError("invalid", `"${discountMethod.discount}" is not a number`);

  return discountAmount || 0;
}
