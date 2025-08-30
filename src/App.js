import { Routes, Route } from "react-router-dom";
import Homepage from "./contents/Home";
import Step4Repair from "./pages/Step4Repair";
import "./styles/App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/step4" element={<Step4Repair />} />
      </Routes>
    </div>
  );
}
