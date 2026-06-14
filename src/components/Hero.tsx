"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="uvod" style={{
      position: "relative",
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Background photo — full width on mobile, right 55% on desktop */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
      }}>
        <Image
          src="/images/burger-hero.jpg"
          alt="Burger Restaurace TUNEL"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.45) 100%)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      </div>

      {/* Content */}
      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingTop: 120, paddingBottom: 80, width: "100%" }}>
        <div className="hero-content" style={{ maxWidth: 580, display: "flex", flexDirection: "column" }}>

          {/* Google rating */}
          <div className="hero-rating" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="17" height="17" viewBox="0 0 24 24" fill="#f5a623">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>4,4/5</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>|</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>více než 720 recenzí na Google</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: 24,
          }}>
            Poctivé jídlo<br />a tankové pivo <span style={{ color: "#ed2323" }}>v Plzni</span>
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.85,
            marginBottom: 40,
            maxWidth: 440,
          }}>
            Čerstvé tankové pivo, poctivé domácí jídlo a příjemná terasa. K nám se lidé vracejí rádi — a to od roku 2014.
          </p>

          {/* 2 CTA buttons */}
          <div className="hero-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#poledni-menu" className="btn-red" style={{ fontSize: 13, padding: "14px 28px" }}>
              Polední menu
            </a>
            <a href="#jidelni-listek" className="btn-ghost" style={{ fontSize: 13, padding: "14px 28px" }}>
              Naše stálé menu
            </a>
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: 0.25, zIndex: 3,
      }}>
        <div style={{ width: 1, height: 44, background: "#fff" }} />
        <span style={{ fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase" }}>scroll</span>
      </div>
    </section>
  );
}
