import { useState } from "react";
import TransactionItem from "./TransactionItem";

const VISIBLE_LIMIT = 5;

function TransactionList({ transactions, onDelete }) {
  const [showAll, setShowAll] = useState(false);

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions yet.</p>
        <span>Add your first transaction to get started.</span>
      </div>
    );
  }

  const visibleTransactions = showAll
    ? transactions
    : transactions.slice(0, VISIBLE_LIMIT);

  const hasMore = transactions.length > VISIBLE_LIMIT;

  return (
    <div>
      <ul className="transaction-list">
        {visibleTransactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
        ))}
      </ul>

      {hasMore && (
        <button
          className="view-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? "Show Less"
            : `View All (${transactions.length - VISIBLE_LIMIT} more)`}
        </button>
      )}
    </div>
  );
}

export default TransactionList;