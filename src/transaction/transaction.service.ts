import { UserService } from "../user/user.service.ts";
import { Transaction } from "../util/model/transaction";
import { TransactionRepository } from "./transaction.repository.ts";


export class TransactionService {
    private transactionRepository: TransactionRepository;
    private userService: UserService;

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.userService = new UserService();
    }

    public create = async(uuid: string, courseId: string, payment: number, total: number) => {
        const id = await this.userService.getUserId(uuid);

        //TODO: check course id exist

        await this.transactionRepository.createTransaction(id, courseId, payment, total);
    }

    public getAll = async(uuid: string) => {
        const id = await this.userService.getUserId(uuid);

        const transactions = (await this.transactionRepository.getTransaction(id)) as unknown as Transaction[];

        if (!transactions) return [];
        return transactions
    }
 
}