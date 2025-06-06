import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  );
}
