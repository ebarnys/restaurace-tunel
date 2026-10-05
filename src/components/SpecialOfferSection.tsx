"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SpecialOfferSection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    fetch("/api/special-offer")
      .then((r) => r.json())
      .then((d) => {
        if (d.active && d.image_url) setImageUrl(d.image_url);
      })
      .catch(() => {});
  }, []);

  if (!imageUrl) return null;

  return (
    <>
      <section id="special-nabidka" className="section" style={{ background: "#0a0a0a", paddingTop: 80, paddingBottom: 80 }}>
        <div className="wrap">
          <span className="section-label">Specialni nabidka</span>
          <div className="section-rule" />
          <h2 className="section-title" style={{ marginBottom: 40 }}>Tento tyden u nas</h2>

          <div
            onClick={() => setLightbox(true)}
            style={{
              position: "relative",
              maxWidth: 560,
              margin: "0 auto",
              cursor: "zoom-in",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.015)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 32px 80px rgba(0,0,0,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 64px rgba(0,0,0,0.6)";
            }}
          >
            {/* Red accent bar on top */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#ed2323", zIndex: 2 }} />

            <Image
              src={imageUrl}
              alt="Specialni nabidka Restaurace TUNEL"
              width={560}
              height={780}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="(max-width: 600px) 100vw, 560px"
              priority
            />

            {/* Zoom hint overlay */}
            <div style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 4,
              padding: "6px 12px",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
            }}>
              Kliknete pro zvetseni
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            backdropFilter: "blur(6px)",
            animation: "fadeIn 0.2s ease",
            cursor: "zoom-out",
          }}
        >
          <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "#fff",
              fontSize: 22,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
          <Image
            src={imageUrl}
            alt="Specialni nabidka Restaurace TUNEL"
            width={900}
            height={1260}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(90vw, 700px)",
              maxHeight: "90vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
              cursor: "default",
            }}
            sizes="(max-width: 600px) 90vw, 700px"
          />
        </div>
      )}
    </>
  );
}
