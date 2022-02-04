import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name discounts/codes/product
 * @method
 * @memberof Discounts/Codes/Methods
 * @summary calculates a discount based on item percentage
 * @param  {String} cartId cartId
 * @param  {String} discountId discountId
 * @param {Object} collections Map of MongoDB collections
 * @returns {Number} returns discount total
 */
export default async function getProductDiscount(cartId, discountId, collections) {
    const { Cart, Discounts } = collections;

    const discountMethod = await Discounts.findOne({ _id: discountId });
    if (!discountMethod) throw new ReactionError("not-found", "Discount not found");

    // For "sale" type discount, the `discount` string is expected to parse as a float, a sale price
    const discountAmount = Number(discountMethod.discount);
    if (isNaN(discountAmount)) throw new ReactionError("invalid", `"${discountMethod.discount}" is not a number`);

    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) throw new ReactionError("not-found", "Cart not found");

    // TODO add item specific conditions to sale calculations.
    let discount = 0;
    const { conditions } = discountMethod;

    if(!conditions.products) throw new ReactionError("invalid", "This discount code does not have any product added yet");

    for (const item of cart.items) {
        const matches = (conditions.products || []).find((productId) => productId == item.productId);

        if (matches) {
            discount += (item.price.amount * discountAmount) / 100;
        }
    }

    return discount;
}