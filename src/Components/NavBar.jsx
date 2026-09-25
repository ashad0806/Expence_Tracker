function Navbar({ activeView, setActiveView, theme, toggleTheme }) {
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
          className={activeView === "summary" ? "active" : ""}
          onClick={() => setActiveView("summary")}
        >
          Monthly Summary
        </button>
        <button
          className={activeView === "add" ? "active" : ""}
          onClick={() => setActiveView("add")}
        >
          Add Transaction
        </button>
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;