export default class Remainder {
    constructor(remainder_id, product_id, shop_id, shelf_amount = 0, order_amount = 0) {
        this.remainder_id = remainder_id;
        this.shop_id = shop_id;
        this.product_id = product_id;
        this.shelf_amount = shelf_amount;
        this.order_amount = order_amount;
    }
}