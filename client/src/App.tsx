import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/:id" element={<EventDetailsPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
