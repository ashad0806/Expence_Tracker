import { useState } from "react";
import Navbar from "./Components/NavBar";
import Balance from "./Components/Balance";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import FilterBar from "./Components/FilterBar";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 1000, category: "Work", date: "2026-09-01" },
    { id: 2, description: "Groceries", amount: -50, category: "Personal", date: "2026-09-05" },
  ]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
    setActiveView("dashboard");
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const getVisibleTransactions = () => {
    let result = [...transactions];

    if (filterCategory !== "All") {
      result = result.filter((t) => t.category === filterCategory);
    }

    switch (sortBy) {
      case "date-asc":
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "amount-asc":
        result.sort((a, b) => a.amount - b.amount);
        break;
      case "amount-desc":
        result.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    return result;
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
          <>
            <FilterBar
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <TransactionList
              transactions={getVisibleTransactions()}
              onDelete={handleDeleteTransaction}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;