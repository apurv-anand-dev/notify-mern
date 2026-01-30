import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Noteify</h3>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/notes" style={styles.link}>Notes</Link>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    margin: 0,
    color: "#333",
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  logout: {
    border: "none",
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
