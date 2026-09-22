function MonthlySummary({ transactions }) {
  const monthly = transactions.reduce((acc, t) => {
    const monthKey = t.date.slice(0, 7); // "YYYY-MM"

    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expense: 0 };
    }

    if (t.amount > 0) {
      acc[monthKey].income += t.amount;
    } else {
      acc[monthKey].expense += Math.abs(t.amount);
    }

    return acc;
  }, {});

  const months = Object.keys(monthly).sort((a, b) => b.localeCompare(a));

  const formatMonth = (key) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  if (months.length === 0) {
    return (
      <div className="empty-state">
        <p>No data yet.</p>
        <span>Add transactions to see your monthly summary.</span>
      </div>
    );
  }

  return (
    <div className="summary-list">
      {months.map((key) => {
        const { income, expense } = monthly[key];
        const net = income - expense;

        return (
          <div className="summary-card" key={key}>
            <h3>{formatMonth(key)}</h3>
            <div className="summary-row">
              <span>Income</span>
              <span className="positive">${income.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Expense</span>
              <span className="negative">${expense.toFixed(2)}</span>
            </div>
            <div className="summary-row summary-net">
              <span>Net</span>
              <span className={net < 0 ? "negative" : "positive"}>
                ${net.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MonthlySummary;