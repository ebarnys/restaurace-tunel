import lunchData from "@/data/lunch-menu.json";

type Day = { day: string; date: string; soup: string; items: { desc: string; price: number }[] };
type LunchData = { weekLabel: string; soupPrice?: number; menuNote?: string; days: Day[] };

export default function LunchMenu() {
  const data = lunchData as LunchData;

  return (
    <section id="poledni-menu" className="section" style={{ background: "var(--dark)" }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, flexWrap: "wrap", gap: 20 }}>
          <div>
            <span className="section-label">Polední menu</span>
            <div className="section-rule" />
            <h2 className="section-title">{data.weekLabel}</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>Servírujeme</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#ed2323" }}>Po – Pá · 11:00 – 14:30</p>
          </div>
        </div>

        {data.menuNote && (
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 48, letterSpacing: "0.04em" }}>
            {data.menuNote} · Samotná polévka: {data.soupPrice},– · Seznam alergenů na vyžádání u obsluhy
          </p>
        )}

        {/* Day cards — 2 columns on desktop, 1 on mobile */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(480px, 100%), 1fr))", gap: 2 }}>
          {data.days.map((day) => (
            <div key={day.day} style={{
              background: "#141414",
              borderTop: "3px solid #ed2323",
              padding: "32px 36px 28px",
            }}>
              {/* Day header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>{day.day}</h3>
                <span style={{ fontSize: 15, color: "#ed2323", fontWeight: 700 }}>{day.date}</span>
              </div>

              {/* Soup */}
              {day.soup && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ed2323", fontWeight: 700 }}>Polévka</span>
                    <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>{day.soup}</span>
                  </div>
                  {data.soupPrice && (
                    <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>{data.soupPrice},–</span>
                  )}
                </div>
              )}

              {/* Main dishes */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {day.items.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16,
                    padding: "13px 0",
                    borderBottom: i < day.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}>
                    <span style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.55, flex: 1 }}>{item.desc}</span>
                    {item.price > 0 && (
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>{item.price},–</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
