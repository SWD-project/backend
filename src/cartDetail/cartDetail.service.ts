import { CartDetail } from "../util/model/cartDetail";
import { CartDetailRepository } from "./cartDetail.repository";

export class CartDetailService {
  private cartDetailRepository: CartDetailRepository;
  constructor() {
    this.cartDetailRepository = new CartDetailRepository();
  }
  public async getAllCartDetail() {
    const cartDetail =
      (await this.cartDetailRepository.getCartDetail()) as unknown as CartDetail;
    if (cartDetail == null) return [];
    return [cartDetail];
  }
}
