import { TransactionModel } from "./transaction.entity.ts";

export class TransactionRepository {
  public getTransaction = async (id?: string) => {
    if (id) {
      return await TransactionModel.findById(id);
    } else {
      return await TransactionModel.find();
    }
  };

  public getTransactionByUserId = async (studentId: string) => {
    return await TransactionModel.find({studentId}).populate("courseId");
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
