"use client";

const hours = [
  { day: "Pondělí – Čtvrtek", time: "10:30 – 23:00" },
  { day: "Pátek", time: "10:30 – 00:00" },
  { day: "Sobota", time: "12:00 – 00:00" },
  { day: "Neděle", time: "12:00 – 22:00" },
];

export default function Contact() {
  return (
    <section id="kontakt" className="section" style={{ background: "var(--black)" }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <span className="section-label">Kontakt</span>
          <div className="section-rule" />
          <h2 className="section-title">Najdete nás v Plzni</h2>
        </div>

        {/* 3 columns */}
        <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>

          {/* Otevírací doba */}
          <div style={{ paddingRight: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ed2323", marginBottom: 32 }}>Otevírací doba</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {hours.map((h, i) => (
                <div key={h.day} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "16px 0",
                  borderBottom: i < hours.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.45)" }}>{h.day}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Adresa */}
          <div style={{ padding: "0 56px", borderLeft: "1px solid rgba(255,255,255,0.07)", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ed2323", marginBottom: 32 }}>Adresa</p>
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }}>Restaurace TUNEL</p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
              Republikánská 859/22<br />312 00 Plzeň 4
            </p>
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ed2323", marginBottom: 16 }}>Vedoucí restaurace</p>
              <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Jiří Gärtner</p>
              <a href="tel:+420725874927"
                style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >+420 725 874 927</a>
            </div>
          </div>

          {/* Kontakt */}
          <div style={{ paddingLeft: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ed2323", marginBottom: 32 }}>Kontakt</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { href: "tel:+420377261690", text: "+420 377 261 690", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
                { href: "mailto:info@tunel.cz", text: "info@tunel.cz", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                { href: "https://www.facebook.com/restaurantTunel/", text: "Facebook", ext: true, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { href: "https://www.instagram.com/restauracetunel/", text: "Instagram", ext: true, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#ed2323" stroke="none"/></svg> },
              ].map((item) => (
                <a key={item.text} href={item.href}
                  target={(item as any).ext ? "_blank" : undefined}
                  rel={(item as any).ext ? "noopener noreferrer" : undefined}
                  style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "flex", alignItems: "center", gap: 14, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  {item.icon}
                  {item.text}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
