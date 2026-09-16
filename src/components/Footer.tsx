"use client";
import Image from "next/image";

const links = [
  { href: "#o-nas", label: "O nás" },
  { href: "#poledni-menu", label: "Polední menu" },
  { href: "#jidelni-listek", label: "Jídelní lístek" },
  { href: "#akce", label: "Akce & události" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

const hours = [
  { day: "Po – Čt", time: "10:30 – 23:00" },
  { day: "Pátek", time: "10:30 – 00:00" },
  { day: "Sobota", time: "12:00 – 00:00" },
  { day: "Neděle", time: "12:00 – 22:00" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#050505" }}>

      {/* Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.8!2d13.411!3d49.7466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470af1c19b5c9db1%3A0x1!2sRepublick%C3%A1nsk%C3%A1%20859%2F22%2C%20312%2000%20Plze%C5%88!5e0!3m2!1scs!2scz!4v1"
        width="100%" height="320" style={{ border: 0, display: "block", filter: "grayscale(1) brightness(0.55) contrast(1.1)" }}
        allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Main footer */}
      <div className="wrap footer-wrap" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 48, marginBottom: 56 }}>

          {/* Logo + tagline */}
          <div>
            <img src="/logo/logo.png" alt="Restaurace TUNEL" style={{ height: 48, width: "auto", marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 260, marginBottom: 20 }}>
              Čerstvé tankové pivo, poctivé jídlo a příjemná terasa v Plzni. K nám se lidé vracejí rádi — a to od roku 2014.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f5a623">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>4,4/5</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>·</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>745 recenzí na Google</span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {[
                { href: "https://www.facebook.com/restaurantTunel/", label: "FB", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { href: "https://www.instagram.com/restauracetunel/", label: "IG", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)",
                  textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ed2323"; e.currentTarget.style.color = "#ed2323"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 24 }}>Navigace</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map((l) => (
                <a key={l.href} href={l.href} style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 24 }}>Kontakt</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="tel:+420377261690" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "flex", alignItems: "center", gap: 10, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +420 377 261 690
              </a>
              <a href="mailto:info@tunel.cz" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "flex", alignItems: "center", gap: 10, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                info@tunel.cz
              </a>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="2" style={{ marginTop: 2, flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Republikánská 859/22<br />312 00 Plzeň 4</span>
              </div>
            </div>
          </div>

          {/* Opening hours */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 24 }}>Otevírací doba</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {hours.map((h) => (
                <div key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.45)" }}>{h.day}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} Restaurace TUNEL · Všechna práva vyhrazena</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>Webdesign <a href="https://www.tmnk.cz" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>TMNK design</a></p>
        </div>
      </div>
    </footer>
  );
}
