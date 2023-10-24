import { CartDetailRepository } from "../cartDetail/cartDetail.repository.ts";
import { CartDetailService } from "../cartDetail/cartDetail.service.ts";
import { EnrolledCourseRepository } from "../enrolledCourse/enrolledCourse.repository.ts";
import { EnrolledCourseService } from "../enrolledCourse/enrolledCourse.service.ts";
import { TransactionService } from "../transaction/transaction.service.ts";
import { getAuthorization } from "../util/get-authorization.ts";
import { CartDetail } from "../util/model/cartDetail/index.ts";
import { Transaction } from "../util/model/transaction/index.ts";
import { CreateUserRequest } from "../util/model/user/create-user.ts";
import { User } from "../util/model/user/index.ts";
import { UpdateUserRequest } from "../util/model/user/update-user.ts";
import { UserRepository } from "./user.repository.ts";

export class UserService {
  private userRepository: UserRepository;
  private enrolledCourseReposiotry: EnrolledCourseRepository;
  private cartDetailRepository: CartDetailRepository;
  private transactionService: TransactionService;

  constructor() {
    this.userRepository = new UserRepository();
    this.enrolledCourseReposiotry = new EnrolledCourseRepository();
    this.cartDetailRepository = new CartDetailRepository();
    this.transactionService = new TransactionService();
  }


  public async createNewUser(createUserN: CreateUserRequest) {
    try {
      const createdUser = (await this.userRepository.createUser(
        createUserN.email,
        createUserN.firstName,
        createUserN.lastName,
        createUserN.roleId,
        createUserN.uuid,
      )) as unknown as User;
      return createdUser;
    } catch (error: any) {
      throw new Error("Lỗi khi tạo người dùng: " + error.message);
    }
  }

  public async getUserByUuid(uuid: string) {
    const user = (await this.userRepository.getUserByUuid(
      uuid
    )) as unknown as User;
    if (user === null) return [];
    return [user];
  }

  public async getUserById(id: string) {
    const user = (await this.userRepository.getUser(id)) as unknown as User;
    if (user === null) return [];
    return [user];
  }

  public async updateUserByUuid(uuid: string, updateUser: UpdateUserRequest) {
    try {
      const count = await this.userRepository.updateUserByUuid(
        uuid,
        updateUser
      );
      return count;
    } catch (error: any) {
      throw new Error("Lỗi khi cập nhật người dùng: " + error.message);
    }
  }

  public async deleteUserById(id: string) {
    try {
      const deletedUser = await this.userRepository.deleteUser(id);
      if (!deletedUser) {
        return "Không tìm thấy người dùng để xóa.";
      }
      return "Xóa người dùng thành công.";
    } catch (error: any) {
      throw new Error("Lỗi khi xóa người dùng: " + error.message);
    }
  }

  public getUserId = async(uuid: string) => {
    const user = await this.getUserByUuid(uuid);
    if ( user.length === 0) throw Error("Invalid Authorization!");

    return user[0]._id;
  }

  public checkout = async(studentId: string, cartDetailId:string[], payment:number) => {
    if (cartDetailId === null || cartDetailId.length === 0) throw Error("List cart Detail is null!");

    //create enrolled course, delete cart detail, create transaction
    for (let i = 0; i < cartDetailId.length; i++) {
      const cartDetail = await this.cartDetailRepository.getCartDetail(cartDetailId[i]) as unknown as CartDetail;

      if (cartDetail) {
        await this.enrolledCourseReposiotry.create(studentId, cartDetail.courseId);
        await this.cartDetailRepository.deleteCartDetail(cartDetail._id);
        await this.transactionService.create(studentId, cartDetail.courseId, payment);
      }
    }
  }
}
