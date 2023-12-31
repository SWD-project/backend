import { CartDetailModel } from "./cartDetail.entity.ts";

export class CartDetailRepository {
  public getCartDetail = async (id?: string) => {
    if (id) {
      return await CartDetailModel.findById(id).populate("courseId");
    } else {
      return await CartDetailModel.find();
    }
  };

  public getCartDetailById = async (_id: string) => {
    return await CartDetailModel.findById(_id);
  };

  public getCartDetailByCartId = async (cartId: string) => {
    return await CartDetailModel.find({ cartId: cartId }).populate("courseId");
  };

  public createCartDetail = async (
    cartId: string,
    courseId: string
  ) => {
    await CartDetailModel.create({
      cartId,
      courseId
    });
  };

  public deleteCartDetail = async (_id: string) => {
    await CartDetailModel.deleteOne({ _id });
  };

  public getCartDetailByCartIdAndCourseId = async (
    cartId: string,
    courseId: string
  ) => {
    return await CartDetailModel.findOne({ cartId, courseId });
  };
}
