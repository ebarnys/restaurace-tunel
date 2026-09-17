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
          width: "100%",
          maxWidth: 460,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.35s ease",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Close button — inside top-right corner */}
        <button
          onClick={close}
          aria-label="Zavřít"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.7)",
            border: "2px solid rgba(255,255,255,0.3)",
            color: "#fff",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          ×
        </button>

        {/* Image — fills available height */}
        <div style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}>
          <Image
            src={imageUrl}
            alt="Speciální nabídka Restaurace TUNEL"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
            sizes="(max-width: 600px) 100vw, 460px"
            priority
          />
        </div>

        {/* Bottom bar */}
        <div style={{
          background: "#111",
          borderTop: "3px solid #ed2323",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ed2323", fontWeight: 700, marginBottom: 2 }}>Speciální nabídka</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Restaurace TUNEL · Plzeň</p>
          </div>
          <a
            href="#jidelni-listek"
            onClick={close}
            style={{
              padding: "9px 20px",
              background: "#ed2323",
              color: "#fff",
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Zobrazit menu
          </a>
        </div>
      </div>
    </div>
  );
}
