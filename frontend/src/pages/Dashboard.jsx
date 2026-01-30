import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [notesCount, setNotesCount] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch("http://localhost:5000/notes", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setNotesCount(data.length));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Dashboard</h2>

        {user ? (
          <>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Total Notes:</b> {notesCount}</p>

            <div style={styles.btnGroup}>
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/notes")}
              >
                Go to Notes
              </button>

              <button
                style={styles.logoutBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "30px auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
  },
  btnGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },
  primaryBtn: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  logoutBtn: {
    padding: "10px 15px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Dashboard;
