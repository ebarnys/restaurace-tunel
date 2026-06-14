"use client";
import { useState } from "react";
import { jidelniListek, napojovyListek } from "@/data/menu";

type Tab = "predkrmy" | "hlavni" | "speciality" | "pivo" | "nealko" | "vino" | "teple";

function Row({ gram, name, desc, price }: { gram?: string; name: string; desc?: string; price: number }) {
  return (
    <div className="menu-row">
      <div style={{ flex: 1 }}>
        {gram && <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 3 }}>{gram}</span>}
        <span style={{ fontSize: 16, fontWeight: 700, display: "block", marginBottom: desc ? 4 : 0 }}>{name}</span>
        {desc && <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{desc}</span>}
      </div>
      <span style={{ fontSize: 17, fontWeight: 800, color: "#ed2323", whiteSpace: "nowrap" }}>{price},–</span>
    </div>
  );
}

function Cat({ children }: { children: React.ReactNode }) {
  return <p className="menu-cat">{children}</p>;
}

export default function Menu() {
  const [tab, setTab] = useState<Tab>("predkrmy");

  const tabs: { id: Tab; label: string }[] = [
    { id: "predkrmy", label: "Předkrmy" },
    { id: "hlavni", label: "Hlavní jídla" },
    { id: "speciality", label: "Speciality" },
    { id: "pivo", label: "Pivo" },
    { id: "nealko", label: "Nealko nápoje" },
    { id: "vino", label: "Víno & aperitiv" },
    { id: "teple", label: "Teplé nápoje" },
  ];

  return (
    <section id="jidelni-listek" className="section" style={{ background: "var(--black)" }}>
      <div className="wrap">
        <span className="section-label" style={{ textAlign: "center", display: "block" }}>Stálé menu</span>
        <div className="section-rule" style={{ margin: "0 auto 28px" }} />
        <h2 className="section-title" style={{ marginBottom: 48, textAlign: "center" }}>Co u nás najdete</h2>

        {/* Tabs */}
        <div className="tabs-wrap" style={{ marginBottom: 56, overflowX: "auto", WebkitOverflowScrolling: "touch" as any }}>
          <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.04)", padding: 4, width: "max-content", margin: "0 auto" }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "13px 32px",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                border: "none", cursor: "pointer", transition: "all 0.2s",
                background: tab === t.id ? "#ed2323" : "transparent",
                color: tab === t.id ? "#fff" : "rgba(255,255,255,0.45)",
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {tab === "predkrmy" && (
            <>
              <Cat>Předkrmy & něco k pivu</Cat>
              {jidelniListek.predkrmy.map((i) => <Row key={i.name} {...i} />)}
              <Cat>Dětská jídla</Cat>
              {jidelniListek.detska.map((i) => <Row key={i.name} {...i} />)}
            </>
          )}
          {tab === "hlavni" && (
            <>
              <Cat>Burgery</Cat>
              {jidelniListek.burgery.items.map((i) => <Row key={i.name} {...i} />)}
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 12, letterSpacing: "0.06em" }}>
                Příloha dle výběru: {jidelniListek.burgery.prilohy.join(" · ")}
              </p>
              <Cat>Tunel Klasik</Cat>
              {jidelniListek.tunelKlasik.map((i) => <Row key={i.name} {...i} />)}
              <Cat>Saláty a těstoviny</Cat>
              {jidelniListek.salatTestovin.map((i) => <Row key={i.name} {...i} />)}
            </>
          )}
          {tab === "speciality" && (
            <>
              <Cat>Speciality šéfkuchaře</Cat>
              {jidelniListek.speciality.map((i) => <Row key={i.name} {...i} />)}
            </>
          )}
          {tab === "pivo" && (
            <>
              <Cat>Čepované pivo</Cat>
              {napojovyListek.cepovanePivo.items.map((item) => (
                <div key={item.name} className="menu-row">
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", flex: 1 }}>{item.name}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#ed2323", whiteSpace: "nowrap" }}>
                    {item.prices.filter(Boolean).map((p) => `${p},–`).join(" / ")}
                  </span>
                </div>
              ))}
              <Cat>Lahvové pivo</Cat>
              {napojovyListek.lahvovePivo.map((item) => (
                <div key={item.name} className="menu-row">
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", flex: 1 }}>{item.name}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#ed2323" }}>{item.price},–</span>
                </div>
              ))}
            </>
          )}
          {tab === "nealko" && (
            <>
              <Cat>Nealkoholické nápoje</Cat>
              {napojovyListek.nealkoholicke.map((item) => (
                <div key={item.name} className="menu-row">
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", flex: 1 }}>{item.name}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#ed2323", whiteSpace: "nowrap" }}>
                    {item.prices.filter(Boolean).map((p) => `${p},–`).join(" / ")}
                  </span>
                </div>
              ))}
            </>
          )}
          {tab === "vino" && (
            <>
              <Cat>Víno & aperitiv</Cat>
              {napojovyListek.vinoAperitiv.items.map((item) => (
                <div key={item.name} className="menu-row">
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", flex: 1 }}>{item.name}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#ed2323", whiteSpace: "nowrap" }}>
                    {item.prices.filter(Boolean).map((p) => `${p},–`).join(" / ")}
                  </span>
                </div>
              ))}
            </>
          )}
          {tab === "teple" && (
            <>
              <Cat>Teplé nápoje</Cat>
              {napojovyListek.teplaNapoje.map((item) => (
                <div key={item.name} className="menu-row">
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", flex: 1 }}>{item.name}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#ed2323" }}>{item.price},–</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
