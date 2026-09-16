import Image from "next/image";

export default function GiftVoucher() {
  const vouchers = [
    { value: "500 Kč" },
    { value: "1 000 Kč" },
    { value: "2 000 Kč" },
  ];

  return (
    <section style={{ background: "var(--dark)", padding: "120px 0" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="voucher-grid">

          {/* Left — text */}
          <div>
            <span className="section-label">Dárkové poukazy</span>
            <div className="section-rule" />
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              Darujte zážitek z dobrého jídla
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: 40 }}>
              Nevíte co darovat? Dárkový poukaz do Restaurace TUNEL potěší každého milovníka poctivého jídla a čerstvého tankového piva. Platnost poukazu je 6 měsíců od zakoupení.
            </p>

            {/* Denominations */}
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Dostupné varianty</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
              {vouchers.map((v) => (
                <div key={v.value} style={{
                  padding: "14px 28px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{v.value}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.7 }}>
              Poukazy jsou k dispozici na vyžádání přímo v restauraci nebo je můžete objednat telefonicky.
            </p>

            <a href="tel:+420377261690" className="btn-red" style={{ fontSize: 13, padding: "15px 36px" }}>
              Zavolat a objednat poukaz
            </a>
          </div>

          {/* Right — photo */}
          <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
            <Image
              src="/images/darkovy-poukaz.png"
              alt="Dárkové poukazy Restaurace TUNEL"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
