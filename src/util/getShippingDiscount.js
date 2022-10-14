/**
 * @name discounts/codes/shipping
 * @method
 * @memberof Discounts/Codes/Methods
 * @summary calculates a discount based on the value of a calculated shipping rate in the cart.
 * @param {String} cart cart
 * @param {String} discountMethod discountId
 * @returns {Number} returns discount total
 */
export default async function getShippingDiscount(cart, discountMethod) {
  // For "shipping" type discounts, the `discount` string is the name of the fulfillment method that should be discounted to be free.
  const fulfillmentMethodName = discountMethod.discount.toUpperCase();

  let discount = 0;
  if (cart.shipping && cart.shipping.length) {
    for (const shipping of cart.shipping) {
      if (shipping.shipmentMethod && shipping.shipmentMethod.name.toUpperCase() === fulfillmentMethodName) {
        discount += Math.max(0, shipping.shipmentMethod.rate);
      }
    }
  }
  return discount;
}
