"use client";

export default function CtaBanner() {
  return (
    <section style={{ background: "#ed2323", padding: "72px 0" }}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 40 }}>
        <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          Chcete si rezervovat stůl?
        </h2>
        <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 600, color: "rgba(0,0,0,0.55)", marginTop: -20, letterSpacing: "0.01em" }}>
          Stačí nám zavolat
        </p>
        <a href="tel:+420377261690" style={{
          display: "inline-block", padding: "17px 44px",
          background: "#fff", color: "#ed2323",
          fontSize: 14, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase",
          textDecoration: "none", transition: "opacity 0.2s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          +420 377 261 690
        </a>
      </div>
    </section>
  );
}
