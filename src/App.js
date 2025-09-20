import { Routes, Route } from "react-router-dom";
import Homepage from "./contents/Home";
import GRNA from "./contents/GRNA";
import CORNGRNA from "./contents/CornGRNA";
import CORN from "./contents/Corn";
import CHOICES from "./contents/Choices";
import SAM from "./contents/Sam";
import SAVED from "./contents/SamSaved";
import Step4Repair from "./pages/Step4Repair";
import DESCRIPTION from "./contents/Description";
import CRISPR from "./contents/CRISPR";
import INSTRUCTIONS from "./contents/Instructions";
import SAMD from "./contents/SamD";
import CORND from "./contents/CornD";
import EARTHD from "./contents/EarthD";
import CUTTING from "./contents/Cutting";
import DEAD from "./contents/DeadSam";
import CORNDEAD from "./contents/CornDead";
import EARTH from "./contents/Earth";
import EARTHGRNA from "./contents/EarthGRNA";
import EARTHDEAD from "./contents/EarthDead"
import SAMGRNAEXP from "./contents/SamGRNAExp"
import "./styles/App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choices" element={<CHOICES />} />
        <Route path="/save-sam" element={<SAM />} />
        <Route path="/save-corn" element={<CORN />} />
        <Route path="/sam/description-sam" element={<SAMD />} />
        <Route path="/corn/description-corn" element={<CORND />} />
        <Route path="/earth/description-earth" element={<EARTHD />} />
        <Route path="/step4" element={<Step4Repair />} />
        <Route path="/grna" element={<GRNA />} />
        <Route path="/corn/grna" element={<CORNGRNA />} />
        <Route path="/earth/grna" element={<EARTHGRNA />} />
        <Route path="/samsaved" element={<SAVED />} />
        <Route path="/description" element={<DESCRIPTION />} />
        <Route path="/crispr" element={<CRISPR />} />
        <Route path="/instructions" element={<INSTRUCTIONS />} />
        <Route path="/cutting" element={<CUTTING />} />
        <Route path="/dead" element={<DEAD />} />
        <Route path="/corn/dead" element={<CORNDEAD />} />
        <Route path="/save-earth" element={<EARTH />} />
        <Route path="/earth/dead" element={<EARTHDEAD />} />
        <Route path="/sam/grna-exp" element={<SAMGRNAEXP />} />
      </Routes>
    </div>
  );
}
