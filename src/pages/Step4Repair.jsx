import React from "react";
import { useNavigate } from "react-router-dom";
import RepairTemplateChoice from "../contents/RepairTemplateChoice.js";
import "../styles/App.css";

export default function Step4Repair() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* keep it tight so it feels like your other game screens */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <RepairTemplateChoice
          targetLabel="HBB mutation (sickle-cell)"
          originalSequence="...CTG AAG GAC..."
          mutatedSequence="...CTG GTG GAC..."
          templates={[
            "5' ...CTG  AAG  GAC... 3'  (Restores correct codon)",
            "5' ...CTG  GCG  GAC... 3'  (Introduces silent change)",
            "5' ...CTG  GTG  GAC... 3'  (Keeps the mutation)"
          ]}
          correctIndex={0}
          onHome={() => navigate("/")}
          onNext={() => navigate("/step5")} // change this path if your step 5 is different
        />
      </div>
    </div>
  );
}
