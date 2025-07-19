import React, { useState, useEffect } from 'react';
import BudgetGoalController from '../controllers/BudgetGoalController';
import TransactionController from '../controllers/TransactionController';
import ReusableButton from '../components/ReusableButton';
import ReusableInput from '../components/ReusableInput';
import ExpensePieChart from '../components/ExpensePieChart';

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

const BudgetGoalView = () => {
  const [budgetGoals, setBudgetGoals] = useState([]);
  const [category, setCategory] = useState(expenseCategories[0]);
  const [limit, setLimit] = useState('');
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [transactions, setTransactions] = useState([]);
  const [overBudgetGoals, setOverBudgetGoals] = useState([]);

  useEffect(() => {
    setBudgetGoals(BudgetGoalController.getBudgetGoals());
    setTransactions(TransactionController.getTransactions());
  }, []);

  useEffect(() => {
    // Calculate spending per category and check if over budget
    const spendingByCategory = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        spendingByCategory[t.category] = (spendingByCategory[t.category] || 0) + t.amount;
      }
    });

    const overBudget = budgetGoals.filter(goal => {
      const spent = spendingByCategory[goal.category] || 0;
      return spent > goal.limit;
    });

    setOverBudgetGoals(overBudget);
  }, [budgetGoals, transactions]);

  const handleAddBudgetGoal = () => {
    if (!limit || isNaN(limit)) return;
    const newGoal = {
      id: Date.now(),
      category,
      limit: parseFloat(limit),
      timePeriod,
    };
    BudgetGoalController.addBudgetGoal(newGoal);
    setBudgetGoals(BudgetGoalController.getBudgetGoals());
    setLimit('');
  };

  const handleDeleteBudgetGoal = (id) => {
    BudgetGoalController.deleteBudgetGoal(id);
    setBudgetGoals(BudgetGoalController.getBudgetGoals());
  };

  // Prepare data for pie chart
  const expenseData = {};
  transactions.forEach(t => {
    if (t.type === 'expense') {
      expenseData[t.category] = (expenseData[t.category] || 0) + t.amount;
    }
  });

  return (
    <div>
      <h2>Budget Goals</h2>
      {overBudgetGoals.length > 0 && (
        <div style={{ backgroundColor: '#ffcccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          {overBudgetGoals.map(goal => {
            const spent = transactions
              .filter(t => t.type === 'expense' && t.category === goal.category)
              .reduce((sum, t) => sum + t.amount, 0);
            const overBy = spent - goal.limit;
            return (
              <div key={goal.id} style={{ color: 'red', fontWeight: 'bold' }}>
                ❗ You have exceeded your Rs {goal.limit} {goal.category} budget by Rs {overBy.toFixed(2)}!
              </div>
            );
          })}
        </div>
      )}
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {expenseCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <ReusableInput
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="Limit Amount"
        />
        <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
        <ReusableButton onClick={handleAddBudgetGoal}>Add Goal</ReusableButton>
      </div>
      <ExpensePieChart data={expenseData} />
      <ul>
        {budgetGoals.map(goal => {
          const spent = transactions
            .filter(t => t.type === 'expense' && t.category === goal.category)
            .reduce((sum, t) => sum + t.amount, 0);
          const percent = Math.min((spent / goal.limit) * 100, 100);
          const overBudget = spent > goal.limit;
          return (
            <li key={goal.id} style={{ marginBottom: '10px' }}>
              <div>
                {goal.category} - Limit: Rs {goal.limit.toFixed(2)} - {goal.timePeriod}
              </div>
              <div style={{ backgroundColor: '#ddd', borderRadius: '5px', height: '20px', width: '100%', marginTop: '5px' }}>
                <div
                  style={{
                    width: `${percent}%`,
                    height: '100%',
                    borderRadius: '5px',
                    backgroundColor: overBudget ? 'red' : 'green',
                    transition: 'width 0.5s ease-in-out',
                  }}
                />
              </div>
              {overBudget && (
                <div style={{ color: 'red', fontWeight: 'bold' }}>
                  🔴 Over Budget!
                </div>
              )}
              <ReusableButton onClick={() => handleDeleteBudgetGoal(goal.id)}>Delete</ReusableButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetGoalView;
