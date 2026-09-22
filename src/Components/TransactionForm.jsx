import { useState } from "react";

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Work");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: type === "expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
      category,
      date: new Date().toISOString().split("T")[0],
    };

    onAddTransaction(newTransaction);

    // Reset form
    setDescription("");
    setAmount("");
    setCategory("Work");
    setType("expense");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <div className="form-row">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Groceries"
        />
      </div>

      <div className="form-row">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-row">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-row">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;