function Balance({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const total = income + expense;

  return (
    <div className="balance-card">
      <h2>Current Balance</h2>
      <p className={`balance-amount ${total < 0 ? "negative" : "positive"}`}>
        ${total.toFixed(2)}
      </p>
      <div className="balance-details">
        <div>
          <span>Income</span>
          <p className="positive">${income.toFixed(2)}</p>
        </div>
        <div>
          <span>Expense</span>
          <p className="negative">${Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Balance;