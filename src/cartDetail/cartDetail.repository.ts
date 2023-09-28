import { CartDetailModel } from "./cartDetail.entity";

export class CartDetailRepository {
  public getCartDetail = (id?: string) => {
    if (id) {
      return CartDetailModel.findById(id);
    } else {
      return CartDetailModel.find();
    }
  };
}
