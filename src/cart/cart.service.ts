import { Cart } from "../util/model/cart";
import { CartRepository } from "./cart.repository";

export class CartService {
  private courseRepository: CartRepository;
  constructor() {
    this.courseRepository = new CartRepository();
  }
  async getAllCart() {
    const cart = (await this.courseRepository.getCart()) as unknown as Cart;
    if (cart == null) return [];
    return [cart];
  }
}
