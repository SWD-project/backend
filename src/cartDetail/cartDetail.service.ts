import { CartRepository } from "../cart/cart.repository.ts";
import { CartService } from "../cart/cart.service.ts";
import { CartDetail } from "../util/model/cartDetail";
import { CreateCartDetailRequest } from "../util/model/cartDetail/create-cart-detail.ts";
import { CartDetailRepository } from "./cartDetail.repository.ts";

export class CartDetailService {
  private cartDetailRepository: CartDetailRepository;
  private cartService: CartService;


  constructor() {
    this.cartDetailRepository = new CartDetailRepository();
    this.cartService =  new CartService();
  }


  public async getAllCartDetail() {
    const cartDetail =
      (await this.cartDetailRepository.getCartDetail()) as unknown as CartDetail;
    if (cartDetail == null) return [];
    return [cartDetail];
  }

  

  public createCartDetail = async(uuid: string, request : CreateCartDetailRequest) => {
    const cart = await this.cartService.getCart(uuid);
    if (!cart) throw Error("Cart is not existed!");

    const cartDetail = await this.cartDetailRepository.getCartDetailByCartIdAndCourseId(cart._id, request.courseId);
    if (cartDetail) throw Error("Course is already in your cart!");

    await this.cartDetailRepository.createCartDetail(cart._id, request.courseId, request.payment,request.total);
  }

  public delete = async (id:string) => {
    const cartDetail = await this.cartDetailRepository.getCartDetailById(id);
    if (!cartDetail) throw Error("Cart detail is not Exist!")

    await this.cartDetailRepository.deleteCartDetail(id);
  }
}
