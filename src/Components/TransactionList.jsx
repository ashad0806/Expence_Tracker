import TransactionItem from "./TransactionItem";

function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions yet.</p>
        <span>Add your first transaction to get started.</span>
      </div>
    );
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TransactionList;