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

  // Donut chart math
  const radius = 60;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentUsed / 100) * circumference;

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
          <div className="donut-wrapper">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={isOverBudget ? "#dc2626" : "#2563eb"}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
              <text
                x="80"
                y="76"
                textAnchor="middle"
                className="donut-percent"
              >
                {percentUsed.toFixed(0)}%
              </text>
              <text
                x="80"
                y="96"
                textAnchor="middle"
                className="donut-label"
              >
                used
              </text>
            </svg>
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