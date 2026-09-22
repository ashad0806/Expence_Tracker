function CategoryChart({ transactions }) {
  const expenses = transactions.filter((t) => t.amount < 0);

  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});

  const categories = Object.keys(totals);
  const maxValue = Math.max(...Object.values(totals), 1);

  if (categories.length === 0) {
    return (
      <div className="chart-card">
        <h2>Spending by Category</h2>
        <p className="chart-empty">No expenses to show yet.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h2>Spending by Category</h2>
      <div className="chart-bars">
        {categories.map((cat) => (
          <div className="chart-bar-row" key={cat}>
            <span className="chart-bar-label">{cat}</span>
            <div className="chart-bar-track">
              <div
                className="chart-bar-fill"
                style={{ width: `${(totals[cat] / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="chart-bar-value">${totals[cat].toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryChart;