class BudgetGoalModel {
  constructor() {
    this.budgetGoals = [];
  }

  getAllBudgetGoals() {
    return this.budgetGoals;
  }

  addBudgetGoal(goal) {
    this.budgetGoals.push(goal);
  }

  updateBudgetGoal(id, updatedGoal) {
    const index = this.budgetGoals.findIndex(g => g.id === id);
    if (index !== -1) {
      this.budgetGoals[index] = { ...this.budgetGoals[index], ...updatedGoal };
    }
  }

  deleteBudgetGoal(id) {
    this.budgetGoals = this.budgetGoals.filter(g => g.id !== id);
  }
}

export default new BudgetGoalModel();
