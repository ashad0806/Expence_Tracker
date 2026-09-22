import { useState } from "react";
import Balance from "./components/Balance";
import "./App.css";

function App() {
  const [transactions] = useState([
    { id: 1, description: "Salary", amount: 1000, category: "Work", date: "2026-09-01" },
    { id: 2, description: "Groceries", amount: -50, category: "Personal", date: "2026-09-05" },
  ]);

  return (
    <div className="app">
      <h1>Personal Expense Tracker</h1>
      <Balance transactions={transactions} />
    </div>
  );
}

export default App;