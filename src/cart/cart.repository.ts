import { CartModel } from "./cart.entity";

export class CartRepository {
  public getCart = (id?: string) => {
    if (id) {
      return CartModel.findById(id);
    } else {
      return CartModel.find();
    }
  };
}
