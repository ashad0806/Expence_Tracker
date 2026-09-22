import { useState, useEffect } from "react";
import Navbar from "./Components/NavBar";
import Balance from "./Components/Balance";
import BudgetTracker from "./Components/BudgetTracker";
import CategoryChart from "./Components/Category_Chart";
import MonthlySummary from "./Components/MonthlySummary";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import FilterBar from "./Components/FilterBar";
import "./App.css";

const STORAGE_KEY = "wallex-transactions";

const defaultTransactions = [
  { id: 1, description: "Salary", amount: 1000, category: "Work", date: "2026-09-01" },
  { id: 2, description: "Groceries", amount: -50, category: "Personal", date: "2026-09-05" },
];

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultTransactions;
  });
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

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

        {activeView === "summary" && (
          <MonthlySummary transactions={transactions} />
        )}

        {activeView === "dashboard" && (
          <div className="dashboard-grid">
            <div className="dashboard-left">
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
            </div>

            <div className="dashboard-right">
              <BudgetTracker transactions={transactions} />
              <CategoryChart transactions={transactions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;