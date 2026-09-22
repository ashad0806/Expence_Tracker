function TransactionItem({ transaction, onDelete }) {
  const isExpense = transaction.amount < 0;

  return (
    <li className="transaction-item">
      <div className="transaction-info">
        <p className="transaction-description">{transaction.description}</p>
        <span className="transaction-meta">
          {transaction.category} • {transaction.date}
        </span>
      </div>
      <div className="transaction-right">
        <span className={isExpense ? "negative" : "positive"}>
          {isExpense ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
        </span>
        <button
          className="delete-btn"
          onClick={() => onDelete(transaction.id)}
          aria-label="Delete transaction"
        >
          ✕
        </button>
      </div>
    </li>
  );
}

export default TransactionItem;