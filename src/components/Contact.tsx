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
        <span className="section-label">Kontakt</span>
        <div className="section-rule" />
        <h2 className="section-title" style={{ marginBottom: 64 }}>Najdete nás v Plzni</h2>

        <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48, marginBottom: 80 }}>

          {/* Otevírací doba */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 24 }}>Otevírací doba</p>
            {hours.map((h) => (
              <div key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.55)" }}>{h.day}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{h.time}</span>
              </div>
            ))}
          </div>

          {/* Adresa */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 24 }}>Adresa</p>
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Restaurace TUNEL</p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>Republikánská 859/22<br />312 00 Plzeň 4</p>
            <div style={{ marginTop: 28, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>Vedoucí restaurace</p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>Jiří Gärtner</p>
              <a href="tel:+420725874927" style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >+420 725 874 927</a>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 24 }}>Kontakt</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { href: "tel:+420377261690", text: "+420 377 261 690", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
                { href: "mailto:info@tunel.cz", text: "info@tunel.cz", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                { href: "https://www.facebook.com/restaurantTunel/", text: "Facebook", ext: true, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { href: "https://www.instagram.com/restauracetunel/", text: "Instagram", ext: true, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#ed2323" stroke="none"/></svg> },
              ].map((item) => (
                <a key={item.text} href={item.href} target={item.ext ? "_blank" : undefined} rel={item.ext ? "noopener noreferrer" : undefined}
                  style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", textDecoration: "none", display: "flex", alignItems: "center", gap: 12, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
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
