import { useState } from "react";
import "../styles/navbar.css";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="navbar">
      <h2>SecureFlix</h2>

      <input
        type="text"
        placeholder="Search videos..."
        value={query}
        onChange={handleChange}
        className="search"
      />
    </div>
  );
}

export default Navbar;