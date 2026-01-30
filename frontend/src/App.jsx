import { Routes, Route, Navigate } from "react-router-dom"; // 👈 FIX
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Note from "./pages/Notes";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route

      path="/notes"

      element ={
        <ProtectedRoute>

          <Note/>
        </ProtectedRoute>
      }
      
      
      
      />


      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
