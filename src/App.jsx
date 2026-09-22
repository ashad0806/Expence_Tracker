import { useState } from "react";
import Balance from "./components/Balance";
import TransactionForm from "./Components/TransactionForm";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 1000, category: "Work", date: "2026-09-01" },
    { id: 2, description: "Groceries", amount: -50, category: "Personal", date: "2026-09-05" },
  ]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="app">
      <h1>Personal Expense Tracker</h1>
      <Balance transactions={transactions} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
    </div>
  );
}

export default App;