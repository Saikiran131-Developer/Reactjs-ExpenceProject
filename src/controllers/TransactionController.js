import TransactionModel from '../models/TransactionModel';

class TransactionController {
  constructor() {
    this.model = TransactionModel;
  }

  getTransactions() {
    return this.model.getAllTransactions();
  }

  addTransaction(transaction) {
    this.model.addTransaction(transaction);
  }

  updateTransaction(id, updatedTransaction) {
    this.model.updateTransaction(id, updatedTransaction);
  }

  deleteTransaction(id) {
    this.model.deleteTransaction(id);
  }
}

export default new TransactionController();
