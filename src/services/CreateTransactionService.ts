import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title:string;
  value:number;
  type:'income'|'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:Request): Transaction {
    // TODO
    const balance = this.transactionsRepository.getBalance();
    const totalBalance = balance.total;

    if (type==='outcome'&&value>totalBalance){
      throw new Error("Saldo insuficiente!");
    }

   const transaction = this.transactionsRepository.create({title,value,type});

   return transaction;
  }
}

export default CreateTransactionService;
