import { CartDetailRepository } from "../cartDetail/cartDetail.repository.ts";
import { UserService } from "../user/user.service.ts";
import { CartDetail } from "../util/model/cartDetail";
import { Cart } from "../util/model/cart";
import { GetCartResponse } from "../util/model/cart/get-cart.ts";
import { CartRepository } from "./cart.repository.ts";

export class CartService {
  private cartRepository: CartRepository;
  private cartDetailRepository: CartDetailRepository;
  private userService: UserService;
  constructor() {
    this.cartRepository = new CartRepository();
    this.userService = new UserService();
    this.cartDetailRepository = new CartDetailRepository();
  }
  async getAllCart() {
    const cart = (await this.cartRepository.getCart()) as unknown as Cart;
    if (cart == null) return [];
    return [cart];
  }

  public createCart = async (uuid: string) => {
    const user = await this.userService.getUserByUuid(uuid);

    const cart = await this.cartRepository.getCartByUserId(user[0]._id);
    if (cart) throw Error("Cart is existed!");

    await this.cartRepository.createCart(user[0]._id);
  };

  public getCartWithCartDetail = async (uuid: string) => {
    const users = await this.userService.getUserByUuid(uuid);
    if (users.length === 0) throw Error("Invalid Authorization");

    const cart = (await this.cartRepository.getCartByUserId(
      users[0]._id
    )) as unknown as Cart;
    if (cart === null) return [];

    const cartDetails: any = await this.getCartDetailByCartId(cart._id);

    const response: GetCartResponse = {
      id: cart._id,
      studentId: cart.studentId,
      cartDetailList: cartDetails,
    };
    return [response];
  };

  private getCartDetailByCartId = async (cartId: string) => {
    const cartDetails = (await this.cartDetailRepository.getCartDetailByCartId(
      cartId
    )) as unknown as CartDetail[];
    if (!cartDetails) return [];
    return cartDetails;
  };

  public getCart = async (uuid: string) => {
    const users = await this.userService.getUserByUuid(uuid);
    if (users.length === 0) throw Error("Invalid Authorization");

    return (await this.cartRepository.getCartByUserId(
      users[0]._id
    )) as unknown as Cart;
  };
}
