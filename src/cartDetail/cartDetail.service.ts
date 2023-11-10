import { CartService } from "../cart/cart.service.ts";
import { CartDetail } from "../util/model/cartDetail";
import { CreateCartDetailRequest } from "../util/model/cartDetail/create-cart-detail.ts";
import { CartDetailRepository } from "./cartDetail.repository.ts";

export class CartDetailService {
  private cartDetailRepository: CartDetailRepository;
  private cartService: CartService;

  constructor() {
    this.cartDetailRepository = new CartDetailRepository();
    this.cartService = new CartService();
  }

  public async getAllCartDetail() {
    const cartDetail =
      (await this.cartDetailRepository.getCartDetail()) as unknown as CartDetail;
    if (cartDetail == null) return [];
    return [cartDetail];
  }

  public createCartDetail = async (
    uuid: string,
    request: CreateCartDetailRequest
  ) => {
    const cart = await this.cartService.getCart(uuid);
    if (!cart) throw Error("Cart is not existed!");

    const cartDetail =
      await this.cartDetailRepository.getCartDetailByCartIdAndCourseId(
        cart._id,
        request.courseId
      );
    if (cartDetail) throw Error("Course is already in your cart!");

    await this.cartDetailRepository.createCartDetail(cart._id, request.courseId);
  }

  public delete = async (id: string) => {
    const cartDetail = await this.cartDetailRepository.getCartDetailById(id);
    if (!cartDetail) throw Error("Cart detail is not Exist!");

    await this.cartDetailRepository.deleteCartDetail(id);
  }

  public get = async(id : string) => {
    return (await this.cartDetailRepository.getCartDetail(id)) as unknown as CartDetail;
  }

  public getCartDetailByCourseId = async(uuid:string, courseId: string) => {
    const cart = await this.cartService.getCart(uuid);
    if (!cart) throw Error("Cart is not existed!");

    const cartDetail =
      await this.cartDetailRepository.getCartDetailByCartIdAndCourseId(
        cart._id,
        courseId
      ) as unknown as CartDetail;

      if (!cartDetail) return [];

      return [cartDetail];
  }
 }
