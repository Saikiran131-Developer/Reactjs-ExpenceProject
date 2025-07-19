class TransactionModel {
  constructor() {
    this.transactions = [];
  }

  getAllTransactions() {
    return this.transactions;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  updateTransaction(id, updatedTransaction) {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...updatedTransaction };
    }
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }
}

export default new TransactionModel();
