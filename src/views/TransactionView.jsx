import React, { useState, useEffect } from 'react';
import TransactionController from '../controllers/TransactionController';
import ReusableButton from '../components/ReusableButton';
import ReusableInput from '../components/ReusableInput';

const expenseCategories = [
  'Food & Dining',
  'Rent',
  'Utilities',
  'Transportation',
  'Entertainment',
  'Health',
  'Education',
  'Subscriptions',
  'Travel',
  'Shopping',
  'Other',
];

const incomeCategories = [
  'Salary',
  'Freelancing',
  'Business',
  'Investments',
  'Gifts',
  'Refunds',
  'Other',
];

const TransactionView = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'income' or 'expense'
  const [category, setCategory] = useState(expenseCategories[0]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    setTransactions(TransactionController.getTransactions());
  }, []);

  const handleAddTransaction = () => {
    if (!description || !amount) return;
    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString(),
    };
    TransactionController.addTransaction(newTransaction);
    setTransactions(TransactionController.getTransactions());
    setDescription('');
    setAmount('');
  };

  const handleDeleteTransaction = (id) => {
    TransactionController.deleteTransaction(id);
    setTransactions(TransactionController.getTransactions());
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount.toString());
      setType(transaction.type);
      setCategory(transaction.category || (transaction.type === 'expense' ? expenseCategories[0] : incomeCategories[0]));
      // Remove the transaction to allow update on add
      TransactionController.deleteTransaction(id);
      setTransactions(TransactionController.getTransactions());
    }
  };

  const filteredTransactions = transactions.filter(t => {
    const matchCategory = filterCategory === 'All' || t.category === filterCategory;
    const matchType = filterType === 'All' || t.type === filterType;
    const matchDate = !filterDate || t.date.startsWith(filterDate);
    return matchCategory && matchType && matchDate;
  });

  const categoriesForType = type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        <ReusableInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <ReusableInput
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select value={type} onChange={(e) => {
          setType(e.target.value);
          setCategory(e.target.value === 'expense' ? expenseCategories[0] : incomeCategories[0]);
        }}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoriesForType.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <ReusableButton onClick={handleAddTransaction}>Add / Update</ReusableButton>
      </div>

      <h3>Filter Transactions</h3>
      <div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {[...expenseCategories, ...incomeCategories].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="month"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <ul>
        {filteredTransactions.map((t) => (
          <li key={t.id}>
            {t.description} - {t.category} - {t.type} - Rs {t.amount.toFixed(2)}{' '}
            <ReusableButton onClick={() => handleEditTransaction(t.id)}>Edit</ReusableButton>{' '}
            <ReusableButton onClick={() => handleDeleteTransaction(t.id)}>Delete</ReusableButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionView;
