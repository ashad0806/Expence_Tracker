function Navbar({ activeView, setActiveView }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">💸</span>
        <span className="navbar-title">Wallex</span>
      </div>
      <div className="navbar-links">
        <button
          className={activeView === "dashboard" ? "active" : ""}
          onClick={() => setActiveView("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={activeView === "add" ? "active" : ""}
          onClick={() => setActiveView("add")}
        >
          Add Transaction
        </button>
      </div>
    </nav>
  );
}

export default Navbar;