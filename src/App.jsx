import { useState } from "react";
import Navbar from "./Components/NavBar";
import Balance from "./Components/Balance";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 1000, category: "Work", date: "2026-09-01" },
    { id: 2, description: "Groceries", amount: -50, category: "Personal", date: "2026-09-05" },
  ]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
    setActiveView("dashboard");
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      <div className="app-content">
        <Balance transactions={transactions} />

        {activeView === "add" && (
          <TransactionForm onAddTransaction={handleAddTransaction} />
        )}

        {activeView === "dashboard" && (
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
          />
        )}
      </div>
    </div>
  );
}

export default App;