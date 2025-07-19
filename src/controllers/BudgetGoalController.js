import BudgetGoalModel from '../models/BudgetGoalModel';

class BudgetGoalController {
  constructor() {
    this.model = BudgetGoalModel;
  }

  getBudgetGoals() {
    return this.model.getAllBudgetGoals();
  }

  addBudgetGoal(goal) {
    this.model.addBudgetGoal(goal);
  }

  updateBudgetGoal(id, updatedGoal) {
    this.model.updateBudgetGoal(id, updatedGoal);
  }

  deleteBudgetGoal(id) {
    this.model.deleteBudgetGoal(id);
  }
}

export default new BudgetGoalController();
