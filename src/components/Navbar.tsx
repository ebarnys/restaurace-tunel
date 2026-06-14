"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#o-nas", label: "O nás" },
  { href: "#poledni-menu", label: "Polední menu" },
  { href: "#jidelni-listek", label: "Jídelní lístek" },
  { href: "#akce", label: "Akce" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || open ? "rgba(10,10,10,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      transition: "background 0.3s",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="#uvod" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo/logo.png" alt="Restaurace TUNEL" style={{ height: 40, width: "auto" }} />
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} style={{
                fontSize: 13, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              >{l.label}</a>
            ))}
            <a href="tel:+420377261690" className="btn-red" style={{ padding: "9px 20px", fontSize: 13 }}>+420 377 261 690</a>
          </div>
        )}

        {/* Mobile burger */}
        {isMobile && (
          <button onClick={() => setOpen(!open)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 8, display: "flex", flexDirection: "column", gap: 5,
          }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: 26, height: 2, background: "#fff", display: "block",
                transition: "all 0.25s",
                transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && open && (
        <div style={{ background: "rgba(10,10,10,0.99)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "8px 20px 28px" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "15px 0",
              fontSize: 15, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)", textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>{l.label}</a>
          ))}
          <a href="tel:+420377261690" className="btn-red" style={{ marginTop: 20, display: "block", textAlign: "center" }} onClick={() => setOpen(false)}>
            +420 377 261 690
          </a>
        </div>
      )}
    </nav>
  );
}
