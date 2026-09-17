"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SpecialOfferPopup() {
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("special_offer_seen");
    if (seen) return;

    fetch("/api/special-offer")
      .then((r) => r.json())
      .then((d) => {
        if (d.active && d.image_url) {
          setImageUrl(d.image_url);
          setVisible(true);
        }
      })
      .catch(() => {});
  }, []);

  function close() {
    setVisible(false);
    sessionStorage.setItem("special_offer_seen", "1");
  }

  if (!visible || !imageUrl) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 520,
          width: "100%",
          animation: "slideUp 0.35s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Zavřít"
          style={{
            position: "absolute",
            top: -16,
            right: -16,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#ed2323",
            border: "none",
            color: "#fff",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(237,35,35,0.4)",
          }}
        >
          ×
        </button>

        {/* Image */}
        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3/4",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}>
          <Image
            src={imageUrl}
            alt="Speciální nabídka Restaurace TUNEL"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 600px) 100vw, 520px"
            priority
          />
        </div>

        {/* Bottom bar */}
        <div style={{
          background: "#111",
          borderTop: "3px solid #ed2323",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ed2323", fontWeight: 700, marginBottom: 2 }}>Speciální nabídka</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Restaurace TUNEL · Plzeň</p>
          </div>
          <a
            href="#jidelni-listek"
            onClick={close}
            style={{
              padding: "10px 24px",
              background: "#ed2323",
              color: "#fff",
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Zobrazit menu
          </a>
        </div>
      </div>
    </div>
  );
}
