import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Notes() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/notes", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch(console.log);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, content }),
    });

    const newNote = await res.json();
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/notes/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
      }),
    });

    const updatedNote = await res.json();

    setNotes((prev) =>
      prev.map((note) =>
        note._id === editId ? updatedNote : note
      )
    );

    setIsEditing(false);
    setEditId(null);
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>My Notes</h2>

        {/* CREATE NOTE */}
        <form onSubmit={handleCreate} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button style={styles.addBtn}>Add Note</button>
        </form>

        {/* EDIT NOTE */}
        {isEditing && (
          <form onSubmit={handleUpdate} style={styles.form}>
            <h3>Edit Note</h3>

            <input
              style={styles.input}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              style={styles.textarea}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <button style={styles.addBtn}>Update</button>
          </form>
        )}

        {/* NOTES LIST */}
        <div style={styles.grid}>
          {notes.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            notes.map((note) => (
              <div key={note._id} style={styles.card}>
                <h4>{note.title}</h4>
                <p>{note.content}</p>

                <div style={styles.cardBtns}>
                  <button
                    style={styles.editBtn}
                    onClick={() => {
                      setIsEditing(true);
                      setEditId(note._id);
                      setEditTitle(note.title);
                      setEditContent(note.content);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    minHeight: "80px",
  },
  addBtn: {
    width: "120px",
    padding: "8px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  cardBtns: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editBtn: {
    background: "#facc15",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Notes;
