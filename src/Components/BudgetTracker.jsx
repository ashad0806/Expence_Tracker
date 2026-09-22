import { useState, useEffect } from "react";

const BUDGET_KEY = "wallex-budget";

function BudgetTracker({ transactions }) {
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem(BUDGET_KEY);
    return saved ? Number(saved) : 0;
  });
  const [inputValue, setInputValue] = useState(budget || "");

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, budget);
  }, [budget]);

  const currentMonthKey = new Date().toISOString().slice(0, 7);

  const currentMonthExpense = transactions
    .filter((t) => t.amount < 0 && t.date.slice(0, 7) === currentMonthKey)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const isOverBudget = budget > 0 && currentMonthExpense > budget;
  const percentUsed = budget > 0 ? Math.min((currentMonthExpense / budget) * 100, 100) : 0;

  const handleSetBudget = (e) => {
    e.preventDefault();
    setBudget(Number(inputValue) || 0);
  };

  return (
    <div className="budget-card">
      <h2>Monthly Budget</h2>

      <form className="budget-form" onSubmit={handleSetBudget}>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Set a monthly budget"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      {budget > 0 && (
        <>
          <div className="budget-progress-track">
            <div
              className={`budget-progress-fill ${isOverBudget ? "over" : ""}`}
              style={{ width: `${percentUsed}%` }}
            ></div>
          </div>
          <p className="budget-status">
            ${currentMonthExpense.toFixed(2)} of ${budget.toFixed(2)} spent this month
          </p>

          {isOverBudget && (
            <div className="budget-warning">
              ⚠ You've exceeded your monthly budget by $
              {(currentMonthExpense - budget).toFixed(2)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BudgetTracker;