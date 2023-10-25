import mongoose from "mongoose";
import { EnrolledCourseModel } from "../enrolledCourse/enrolledCourse.entity.ts";
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

  public sumTotal = async(courseId : string) => {
    const result = await TransactionModel.aggregate([
      {
        $match: {
          courseId: new mongoose.Types.ObjectId(courseId)
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
  
    if (result.length > 0) {
      return result[0].total;
    } else {
      return 0;
    }
  }

  
}
