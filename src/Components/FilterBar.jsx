function FilterBar({ filterCategory, setFilterCategory, sortBy, setSortBy }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Category</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort by</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">Date (newest first)</option>
          <option value="date-asc">Date (oldest first)</option>
          <option value="amount-desc">Amount (high to low)</option>
          <option value="amount-asc">Amount (low to high)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;