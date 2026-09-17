"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type MenuItem = { desc: string; price: number };
type DayMenu = { day: string; date: string; soup: string; items: MenuItem[] };
type LunchMenu = { weekLabel: string; days: DayMenu[] };

const DAYS = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];

function emptyDay(day: string): DayMenu {
  return { day, date: "", soup: "", items: [{ desc: "", price: 94 }, { desc: "", price: 94 }, { desc: "", price: 94 }] };
}

function emptyMenu(): LunchMenu {
  return { weekLabel: "", days: DAYS.map(emptyDay) };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [authError, setAuthError] = useState("");
  const [menu, setMenu] = useState<LunchMenu>(emptyMenu());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Special offer state
  const [offerActive, setOfferActive] = useState(false);
  const [offerImageUrl, setOfferImageUrl] = useState<string | null>(null);
  const [offerUploading, setOfferUploading] = useState(false);
  const [offerMsg, setOfferMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lunch-menu");
      const data = await res.json();
      // verify password by trying to save
      const test = await fetch("/api/lunch-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, password }),
      });
      if (test.ok) {
        const loaded = data as LunchMenu;
        if (!loaded.days || loaded.days.length === 0) {
          loaded.days = DAYS.map(emptyDay);
        }
        setMenu(loaded);
        setAuth(true);
        // Load special offer state
        fetch("/api/special-offer").then(r => r.json()).then(d => {
          setOfferActive(d.active);
          setOfferImageUrl(d.image_url);
        }).catch(() => {});
      } else {
        setAuthError("Nesprávné heslo. Zkuste to znovu.");
      }
    } catch {
      setAuthError("Chyba připojení. Zkuste to znovu.");
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/lunch-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...menu, password }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateDay(dayIndex: number, field: keyof DayMenu, value: string) {
    const days = [...menu.days];
    days[dayIndex] = { ...days[dayIndex], [field]: value };
    setMenu({ ...menu, days });
  }

  function updateItem(dayIndex: number, itemIndex: number, field: keyof MenuItem, value: string | number) {
    const days = [...menu.days];
    const items = [...days[dayIndex].items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    days[dayIndex] = { ...days[dayIndex], items };
    setMenu({ ...menu, days });
  }

  function addItem(dayIndex: number) {
    const days = [...menu.days];
    days[dayIndex].items.push({ desc: "", price: 94 });
    setMenu({ ...menu, days });
  }

  function removeItem(dayIndex: number, itemIndex: number) {
    const days = [...menu.days];
    days[dayIndex].items = days[dayIndex].items.filter((_, i) => i !== itemIndex);
    setMenu({ ...menu, days });
  }

  async function handleOfferUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setOfferUploading(true);
    setOfferMsg("");
    const form = new FormData();
    form.append("password", password);
    form.append("image", file);
    const res = await fetch("/api/special-offer", { method: "POST", body: form });
    const data = await res.json();
    if (res.ok) {
      setOfferImageUrl(data.image_url);
      setOfferActive(true);
      setOfferMsg("Nahráno a aktivováno.");
    } else {
      setOfferMsg("Chyba: " + data.error);
    }
    setOfferUploading(false);
  }

  async function handleOfferToggle(active: boolean) {
    setOfferActive(active);
    await fetch("/api/special-offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, active }),
    });
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    borderRadius: 2,
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 600 as const,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.4)",
    display: "block",
    marginBottom: 6,
  };

  if (!auth) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 360, padding: 48, background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Image src="/logo/Tunel-logo-bile.svg" alt="TUNEL" width={120} height={46} style={{ height: 28, width: "auto", marginBottom: 32 }} />
          <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Admin</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>Správa polédního menu</p>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Heslo</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {authError && <p style={{ fontSize: 13, color: "#ed2323" }}>{authError}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 24px",
                background: "#ed2323",
                color: "#fff",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Přihlašuji..." : "Přihlásit se"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Image src="/logo/Tunel-logo-bile.svg" alt="TUNEL" width={100} height={38} style={{ height: 26, width: "auto" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>SPRÁVA POLÉDNÍHO MENU</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {saved && <span style={{ fontSize: 13, color: "#4ade80" }}>✓ Uloženo</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "10px 28px",
                background: "#ed2323",
                color: "#fff",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: saving ? "wait" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Ukládám..." : "Uložit menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* Help section */}
        <div style={{ marginBottom: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {/* Card 1 — Polední menu */}
          <div style={{ padding: 28, background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ed2323", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📋</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>Jak zadat polední menu</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {[
                { n: 1, text: 'Do pole "Označení týdne" napiš rozsah datumů, který se zobrazí zákazníkům jako nadpis — např. 15. – 19. 9. 2025.' },
                { n: 2, text: "Pro každý den (Pondělí–Pátek) zadej datum (např. 15. 9.), název polévky a jednotlivá jídla s cenou v Kč." },
                { n: 3, text: 'Chybí ti položka? Klikni na "+ Přidat položku". Nepotřebuješ ji? Klikni na × vedle ní.' },
                { n: 4, text: 'Až máš vše vyplněno, klikni na červené tlačítko "Uložit menu" — změny se okamžitě zobrazí na webu, není třeba nic dalšího dělat.' },
              ].map(({ n, text }) => (
                <div key={n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#ed2323", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 1 }}>{n}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Speciální nabídka */}
          <div style={{ padding: 28, background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ed2323", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🖼️</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>Jak spravovat speciální nabídku</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {[
                { n: 1, text: 'Speciální nabídku najdeš níže na stránce. Klikni na pole "Nahrát obrázek" a vyber fotografii nebo leták akce (JPG, PNG nebo WebP).' },
                { n: 2, text: "Po nahrání se nabídka automaticky zapne — popup s obrázkem se zobrazí každému návštěvníkovi jednou při otevření webu." },
                { n: 3, text: "Chceš nabídku dočasně skrýt? Přepni přepínač do polohy „vypnuto" — obrázek zůstane uložený, jen se návštěvníkům nezobrazí." },
                { n: 4, text: "Nová akce? Jednoduše nahraj nový obrázek — automaticky nahradí starý a nabídka se znovu aktivuje." },
              ].map(({ n, text }) => (
                <div key={n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#ed2323", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 1 }}>{n}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Week label */}
        <div style={{ marginBottom: 40, padding: 24, background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
          <label style={labelStyle}>Označení týdne (zobrazí se na webu)</label>
          <input
            type="text"
            value={menu.weekLabel}
            onChange={(e) => setMenu({ ...menu, weekLabel: e.target.value })}
            style={{ ...inputStyle, fontSize: 16 }}
            placeholder="např. 13. – 17. 5. 2025"
          />
        </div>

        {/* Days */}
        {menu.days.map((day, di) => (
          <div key={day.day} style={{ marginBottom: 32, padding: 28, background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-end", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 auto" }}>
                <label style={labelStyle}>Den</label>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#ed2323", padding: "10px 0" }}>{day.day}</div>
              </div>
              <div style={{ flex: "0 0 160px" }}>
                <label style={labelStyle}>Datum</label>
                <input
                  type="text"
                  value={day.date}
                  onChange={(e) => updateDay(di, "date", e.target.value)}
                  style={inputStyle}
                  placeholder="např. 13. 5."
                />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <label style={labelStyle}>Polévka</label>
                <input
                  type="text"
                  value={day.soup}
                  onChange={(e) => updateDay(di, "soup", e.target.value)}
                  style={inputStyle}
                  placeholder="název polévky"
                />
              </div>
            </div>

            <div>
              <label style={{ ...labelStyle, marginBottom: 12 }}>Položky menu</label>
              {day.items.map((item, ii) => (
                <div key={ii} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", width: 20, textAlign: "center", flexShrink: 0 }}>{ii + 1}.</span>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => updateItem(di, ii, "desc", e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder="Popis pokrmu"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(di, ii, "price", Number(e.target.value))}
                    style={{ ...inputStyle, width: 90, textAlign: "right" }}
                    placeholder="Cena"
                  />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>Kč</span>
                  {day.items.length > 1 && (
                    <button
                      onClick={() => removeItem(di, ii)}
                      style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 18, padding: "0 4px", flexShrink: 0 }}
                    >×</button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem(di)}
                style={{
                  marginTop: 8,
                  background: "none",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.4)",
                  padding: "8px 20px",
                  fontSize: 12,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ed2323"; e.currentTarget.style.color = "#ed2323"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
              >
                + Přidat položku
              </button>
            </div>
          </div>
        ))}

        <div style={{ paddingTop: 16, textAlign: "right" }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "14px 40px",
              background: "#ed2323",
              color: "#fff",
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: saving ? "wait" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Ukládám..." : "Uložit menu"}
          </button>
        </div>

        {/* Special offer section */}
        <div style={{ marginTop: 32, padding: 32, background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ed2323", marginBottom: 24 }}>Speciální nabídka</p>

          {/* Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <button
              onClick={() => handleOfferToggle(!offerActive)}
              style={{
                width: 48, height: 26, borderRadius: 13,
                background: offerActive ? "#ed2323" : "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
              }}
            >
              <span style={{
                position: "absolute", top: 3, left: offerActive ? 25 : 3,
                width: 20, height: 20, borderRadius: "50%", background: "#fff",
                transition: "left 0.2s",
              }} />
            </button>
            <span style={{ fontSize: 14, color: offerActive ? "#fff" : "rgba(255,255,255,0.4)" }}>
              {offerActive ? "Nabídka je aktivní — zobrazuje se návštěvníkům" : "Nabídka je skrytá"}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: offerImageUrl ? "1fr 1fr" : "1fr", gap: 24, alignItems: "start" }}>
            {/* Upload */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 12 }}>
                Nahrát obrázek
              </label>
              <label style={{
                display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center",
                padding: "32px 24px", border: "2px dashed rgba(255,255,255,0.12)",
                cursor: offerUploading ? "wait" : "pointer", gap: 8,
                transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ed2323")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              >
                <input type="file" accept="image/*" onChange={handleOfferUpload} style={{ display: "none" }} disabled={offerUploading} />
                <span style={{ fontSize: 28 }}>{offerUploading ? "⏳" : "📷"}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  {offerUploading ? "Nahrávám..." : "Klikni pro výběr obrázku"}
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>JPG, PNG, WebP</span>
              </label>
              {offerMsg && <p style={{ fontSize: 13, color: offerMsg.startsWith("Chyba") ? "#ed2323" : "#4ade80", marginTop: 12 }}>{offerMsg}</p>}
            </div>

            {/* Preview */}
            {offerImageUrl && (
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 12 }}>
                  Aktuální obrázek
                </label>
                <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={offerImageUrl} alt="Speciální nabídka" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
