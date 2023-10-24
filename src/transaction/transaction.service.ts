import { CourseRepository } from "../course/course.repository.ts";
import { UserService } from "../user/user.service.ts";
import { Course } from "../util/model/course/index.ts";
import { Transaction } from "../util/model/transaction";
import { TransactionRepository } from "./transaction.repository.ts";


export class TransactionService {
    private transactionRepository: TransactionRepository;
    private courseRepository : CourseRepository;


    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.courseRepository = new CourseRepository();
    }

    public create = async(id: string, courseId: string, payment: number) => {
        const course = await this.courseRepository.getCourse(courseId) as unknown as Course;
        if (!course) throw Error("CourseId is not exist!");

        const total = (course.price * course.discountPercent) / 100;

        await this.transactionRepository.createTransaction(id, courseId, payment, total);
    }

    public getAll = async(id: string) => {
        const transactions = (await this.transactionRepository.getTransactionByUserId(id)) as unknown as Transaction[];

        if (!transactions) return [];
        return transactions;
    }
 
}