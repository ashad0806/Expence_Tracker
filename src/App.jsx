import { useState } from "react";
import Navbar from "./Components/NavBar";
import Balance from "./components/Balance";
import TransactionForm from "./Components/TransactionForm";
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

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      <div className="app-content">
        <Balance transactions={transactions} />

        {activeView === "add" && (
          <TransactionForm onAddTransaction={handleAddTransaction} />
        )}
      </div>
    </div>
  );
}

export default App;