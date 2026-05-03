import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "@/pages/Admin";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
