// src/contents/RepairTemplateChoice.js
import React, { useMemo, useState } from "react";
import "../styles/App.css";

export default function RepairTemplateChoice({
  targetLabel = "Target: HBB (Sickle-cell mutation)",
  originalSequence = "Ref: ...CTG AAG GAC...",
  mutatedSequence  = "Mut: ...CTG GTG GAC...",
  templates = [
    "5' ...CTG  AAG  GAC... 3'  (Restores correct codon)",
    "5' ...CTG  GCG  GAC... 3'  (Introduces silent change)",
    "5' ...CTG  GTG  GAC... 3'  (Keeps the mutation)",
  ],
  correctIndex = 0,
  onHome,
  onNext,   // keep for when player presses Next on SAM IS SAVED
}) {
  const options = useMemo(
    () => templates.slice(0, 3).map((txt, i) => ({ txt, i })),
    [templates]
  );

  const explain = {
    correct:
      "This template re-introduces the reference base(s) so HDR can fix the mutation and restore the original codon (AAG → Lys).",
    others: [
      "Template 2 changes the codon in a different way (e.g., could be a ‘silent’ or different change) — it does not match the reference sequence.",
      "Template 3 keeps the mutated base(s), so the disease-causing change remains.",
    ],
  };

  const [selected, setSelected] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const success = selected !== null && selected === correctIndex;

  /* ---------- SAM IS SAVED (only if correct + Next clicked) ---------- */
  if (showSaved) {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="header">SAM IS SAVED</div>
        <p className="score">Repair complete</p>

        <div className="all" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 10 }}>
          <button className="another" onClick={onHome}>Home</button>
          <img
            className="sam-unhappy-img"
            src={require("../images/sam-happy.png")}
            alt="Happy Sam"
            data-pin-nopin="true"
          />
          <button className="another" onClick={onNext}>Next</button>
        </div>
      </div>
    );
  }

  /* ---------- Empty placeholder (if wrong + Next clicked) ---------- */
  if (showEmpty) {
    return <div className="container" />;
  }

  /* ---------- Choice screen ---------- */
  return (
    <div style={{ paddingTop: 8 }}>
      <h2 className="header" style={{ fontSize: "3.2rem", lineHeight: 1.05, margin: "0 0 8px 0" }}>
        Step 4 · Repair Template Choice
      </h2>
      <p style={{ margin: "0 0 16px 4px", opacity: 0.85 }}>
        Pick the donor DNA template that restores the original (healthy) sequence after Cas9 cut.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 18,
          alignItems: "stretch",
          minHeight: "56vh",
        }}
      >
        {/* LEFT info panel */}
        <div className="pixel-box info-panel" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span className="chip">Repair HDR</span>
            <span className="chip info">Template Selection</span>
          </div>
          <LabelBlock title={targetLabel} value="—" />
          <LabelBlock title="ORIGINAL (REFERENCE)" value={originalSequence} mono />
          <LabelBlock title="MUTATED (CURRENT)" value={mutatedSequence} mono />
          <div style={{ flex: 1 }} />
        </div>

        {/* RIGHT side */}
        <div style={{ display: "grid", gridTemplateRows: "1fr 8px auto", gap: 0, height: "100%" }}>
          <div style={{ display: "grid", gap: 14, overflowY: "auto", paddingRight: 2 }}>
            {options.map(({ txt, i }) => {
              const picked = selected === i;
              const isCorrect = selected !== null && i === correctIndex;
              const isWrong = selected !== null && picked && i !== correctIndex;
              return (
                <button
                  key={i}
                  onClick={() => selected === null && setSelected(i)}
                  disabled={selected !== null}
                  className={"pixel-box" + (isCorrect ? " ok" : "") + (isWrong ? " bad" : "")}
                  style={{ textAlign: "left" }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Repair Template {i + 1}</div>
                  <div className="mono">{txt}</div>
                </button>
              );
            })}

            {selected !== null && !success && (
              <div className="pixel-box bad">
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Not quite. ⚠️</div>
                <p>
                  This template doesn’t fix the mutation (or introduces an unintended change).
                  Compare against the reference sequence on the left.
                </p>
              </div>
            )}

            {success && (
              <div className="pixel-box ok">
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Correct! ✅</div>
                <p style={{ marginBottom: 8 }}>{explain.correct}</p>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>What the other options mean:</div>
                <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                  <li style={{ marginBottom: 4 }}>{explain.others[0]}</li>
                  <li>{explain.others[1]}</li>
                </ul>
              </div>
            )}
          </div>

          <div />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <button className="another" onClick={onHome}>Home</button>
            <button
              className="another"
              disabled={selected === null}
              onClick={() => {
                if (success) setShowSaved(true);
                else setShowEmpty(true);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* styles */}
      <style>{`
        .chip {
          display:inline-block;
          font-size:12px;
          font-weight:700;
          padding:4px 10px;
          border-radius:999px;
          border:2px solid rgba(0,0,0,.12);
          background:#f8fafc;
        }
        .chip.info { background:#eef5ff; }

        .pixel-box {
          font: inherit;
          width: 100%;
          padding: 14px 16px;
          border: 6px solid #000;
          border-radius: 8px;
          background: linear-gradient(#e8e8e8, #d5d5d5);
          box-shadow:
            0 6px 0 #000,
            inset -6px -6px 0 rgba(0,0,0,.15),
            inset  6px  6px 0 rgba(255,255,255,.35);
          color: #111;
        }
        .pixel-box.ok { background: linear-gradient(#e7fff0, #c8f6da); }
        .pixel-box.bad { background: linear-gradient(#ffecec, #ffd3d3); }
        .pixel-box.info-panel {
          background: linear-gradient(rgba(255,255,255,0.92), rgba(235,235,235,0.92));
        }
        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
}

function LabelBlock({ title, value, mono }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", opacity: 0.75, marginBottom: 6 }}>
        {title}
      </div>
      <div className={mono ? "mono" : undefined}>{value}</div>
    </div>
  );
}
