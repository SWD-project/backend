import { CartModel } from "./cart.entity.ts";

export class CartRepository {
  public getCart = async (id?: string) => {
    if (id) {
      return await CartModel.findById(id);
    } else {
      return await CartModel.find();
    }
  };

  public getCartByUserId = async (_studentId: string) => {
    return await CartModel.findOne({studentId: _studentId}).exec();
  }

  public createCart = async (_studentId: string) => {
    await CartModel.create(
      {studentId: _studentId,
        sessionId: "",
      }
    )
  }

}
