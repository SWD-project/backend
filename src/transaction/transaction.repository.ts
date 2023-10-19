import { TransactionModel } from "./transaction.entity";

export class TransactionRepository {
  public getTransaction = async (id?: string) => {
    if (id) {
      return await TransactionModel.findById(id);
    } else {
      return await TransactionModel.find({ courseStatus: 1 });
    }
  };

  public getTransactionByUserId = async (userId: string) => {
    return await TransactionModel.find({ studentId: userId }).populate(
      "courseId"
    );
  };

  public createTransaction = async (
    studentId: string,
    courseId: string,
    payment: number,
    total: number
  ) => {
    await TransactionModel.create({
        studentId,
        courseId,
        payment,
        total
    })
  };
}
