"use client";
import Image from "next/image";

const events = [
  { img: "/images/hospoda/IMG_4980.jpg", title: "Svatební hostiny & rauty", desc: "Soukromý salonek pro cca 35 hostů, dekorace, catering — vše připravíme na míru vašemu velkému dni." },
  { img: "/images/jidlo/IMG_4705.jpg", title: "Grilování & letní akce", desc: "Pravidelné letní grilování na terase s živou hudbou. Klobásy, kotlety, špízy přímo z grilu." },
  { img: "/images/hospoda/IMG_5040.jpg", title: "Firemní akce & večírky", desc: "Vánoční večírky, teambuildingy, narozeninové oslavy. Zastřešený prostor pro kapelu i diváky." },
  { img: "/images/hospoda/IMG_5447.jpg", title: "Zabijačkové hody", desc: "Minimálně jednou ročně tradiční zabijačkové hody s muzikanty — harmonika nebo housle." },
];

export default function Events() {
  return (
    <section id="akce" className="section" style={{ background: "var(--dark)" }}>
      <div className="wrap">
        <div style={{ maxWidth: 780, marginBottom: 64, textAlign: "center", margin: "0 auto 64px" }}>
          <span className="section-label">Akce & události</span>
          <div className="section-rule" style={{ margin: "0 auto 28px" }} />
          <h2 className="section-title" style={{ marginBottom: 24 }}>Víc než jen restaurace</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.85 }}>
            Kromě každodenního poledního menu a stálé nabídky jídel a nápojů pořádáme pravidelné sezónní akce a rádi zajistíme i tu vaši — ať už jde o soukromou oslavu, firemní večírek, svatební hostinu nebo raut. Jídlo dovezeme také přímo k vám.
          </p>
        </div>

        <div className="grid-cards" style={{ marginBottom: 32 }}>
          {events.map((ev) => (
            <div key={ev.title} style={{
              background: "#111",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
                <Image src={ev.img} alt={ev.title} fill style={{ objectFit: "cover", transition: "transform 0.5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
              </div>
              {/* Text */}
              <div style={{ padding: "28px 36px 36px" }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#ed2323", marginBottom: 12, letterSpacing: "0.01em" }}>{ev.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — přímo pod kartami */}
        <div style={{ padding: "36px 48px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <div>
            <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
              Plánujete akci?
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)" }}>Rádi vše připravíme na míru.</p>
          </div>
          <a href="#kontakt" className="btn-red" style={{ fontSize: 13, padding: "14px 40px", flexShrink: 0 }}>
            Napište nám
          </a>
        </div>

        {/* Entertainment & sport strip */}
        <div className="events-info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {/* Sports */}
          <div style={{ padding: "28px 32px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 16 }}>V areálu Sokol Letná</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px" }}>
              {[
                { icon: "🏐", label: "Beach volejbal" },
                { icon: "⚽", label: "Fotbal" },
                { icon: "🦶", label: "Nohejbal" },
                { icon: "🏐", label: "Volejbal" },
                { icon: "♟️", label: "Šachy" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Entertainment */}
          <div style={{ padding: "28px 32px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 16 }}>Zábava v restauraci</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px" }}>
              {[
                { icon: "📺", label: "Přenosy FC Viktoria Plzeň" },
                { icon: "🎯", label: "Šipkový automat" },
                { icon: "🧠", label: "Pub quiz" },
                { icon: "🍺", label: "Rezervace na zápasy" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
