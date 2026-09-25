import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function TransactionItem({ transaction, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isExpense = transaction.amount < 0;

  const handleConfirmDelete = () => {
    onDelete(transaction.id);
    setShowConfirm(false);
  };

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
          onClick={() => setShowConfirm(true)}
          aria-label="Delete transaction"
        >
          ✕
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          message={`Delete "${transaction.description}"? This can't be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </li>
  );
}

export default TransactionItem;