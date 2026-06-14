"use client";

const facilities = [
  { icon: "🏐", name: "Beach service", desc: "Plážový volejbal přímo v areálu restaurace." },
  { icon: "⚽", name: "Fotbal", desc: "Fotbalové hřiště Sokol Letná v těsném sousedství." },
  { icon: "🦶", name: "Nohejbal", desc: "Nohejbalové kurty v areálu Sokol Letná." },
  { icon: "🏐", name: "Volejbal", desc: "Volejbalové kurty pro rekreační i soutěžní hru." },
  { icon: "♟️", name: "Šachy", desc: "Relaxační hra v příjemném prostředí restaurace." },
];

export default function Sport() {
  return (
    <section id="sport" className="section" style={{ background: "var(--black)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <div>
            <span className="section-label">Sportovní vyžití</span>
            <div className="section-rule" />
            <h2 className="section-title">Sport & aktivní<br />odpočinek</h2>
          </div>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 360, lineHeight: 1.75 }}>
            Součástí areálu jsou sportoviště, která můžete využít v rámci návštěvy restaurace nebo samostatně.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, background: "rgba(255,255,255,0.04)" }}>
          {facilities.map((f, i) => (
            <div key={f.name} style={{
              padding: "40px 24px",
              background: "var(--dark)",
              borderRight: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none",
              borderTop: "3px solid transparent",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = "#ed2323"; e.currentTarget.style.background = "#1a1a1a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = "transparent"; e.currentTarget.style.background = "var(--dark)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{f.name}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
