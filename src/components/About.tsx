"use client";
import Image from "next/image";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="1.8">
        {/* Beer mug */}
        <path d="M5 3h11l1 13a2 2 0 01-2 2H6a2 2 0 01-2-2L5 3z"/>
        <path d="M16 7h3a1 1 0 011 1v4a1 1 0 01-1 1h-3"/>
        <line x1="8" y1="3" x2="7.5" y2="1"/>
        <line x1="12" y1="3" x2="12" y2="1"/>
      </svg>
    ),
    title: "Tankové pivo",
    desc: "4 druhy čerstvého piva přímo z tanků Plzeňského Prazdroje.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="1.8">
        {/* Chair / private room */}
        <path d="M6 19v-7"/>
        <path d="M18 19v-7"/>
        <path d="M4 12h16"/>
        <path d="M6 12V7a2 2 0 012-2h8a2 2 0 012 2v5"/>
        <path d="M6 19h12"/>
      </svg>
    ),
    title: "Soukromý salonek",
    desc: "Privátní prostor pro až 35 hostů — svatby, oslavy, firemní akce.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ed2323" strokeWidth="1.8">
        {/* Umbrella / terrace canopy */}
        <path d="M23 12a11.05 11.05 0 00-22 0zm-5 7a3 3 0 01-6 0v-7"/>
      </svg>
    ),
    title: "Velká terasa",
    desc: "Zastřešená i venkovní terasa s posezením a lehátky.",
  },
];

export default function About() {
  return (
    <section id="o-nas" className="section" style={{ background: "var(--black)", overflow: "hidden" }}>
      <div className="wrap">
        <div className="grid-2">

          {/* Left — photo */}
          <div style={{ position: "relative", height: "min(600px, 70vw)", minHeight: 320, overflow: "hidden" }}>
            <Image
              src="/images/chef-v3.jpg"
              alt="Kuchyně Restaurace TUNEL"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            {/* Dark overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
            {/* Fade right */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, var(--black) 100%)" }} />
            {/* Year badge */}
            <div style={{
              position: "absolute", bottom: 32, left: 32,
              background: "rgba(10,10,10,0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "16px 24px",
              backdropFilter: "blur(8px)",
            }}>
              <p style={{ fontSize: 32, fontWeight: 900, color: "#ed2323", lineHeight: 1 }}>2014</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>Otevřeno v Plzni</p>
            </div>
          </div>

          {/* Right — text */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="section-label">O nás</span>
            <div className="section-rule" />
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Místo, kam se hosté<br />rádi vracejí
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: 16, fontSize: 17 }}>
              Od roku 2014 se snažíme udělat toto místo příjemnou tradiční restaurací, kam se hosté rádi a s chutí vracejí — nejen na výborné jídlo, ale i na skvělé čepované pivo přímo z tanku nebo jen tak posedět na příjemné terase.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.85, marginBottom: 40, fontSize: 17 }}>
              Ve spolupráci s Plzeňským Prazdrojem je u nás možné ochutnat až 4 druhy piv přímo z tanků, které vidíte hned při příchodu. Přibyly nové terasy, salonek s 35 místy a vzduchotechnika.
            </p>

            {/* Features list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
              {features.map((f) => (
                <div key={f.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, background: "rgba(237,35,35,0.1)",
                    border: "1px solid rgba(237,35,35,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{f.title}</p>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
