"use client";
import { useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/google-review-1.webp", alt: "Restaurace TUNEL" },
  { src: "/images/jidlo/IMG_7002.jpg", alt: "Vepřová panenka" },
  { src: "/images/jidlo/IMG_7004.jpg", alt: "Hovězí sendvič" },
  { src: "/images/google-review-2.webp", alt: "Restaurace TUNEL" },
  { src: "/images/jidlo/IMG_7001.jpg", alt: "Vepřenka v omáčce" },
  { src: "/images/jidlo/IMG_8926.jpg", alt: "Hovězí líčka" },
  { src: "/images/google-review-3.webp", alt: "Restaurace TUNEL" },
  { src: "/images/jidlo/IMG_7003.jpg", alt: "Svíčková" },
  { src: "/images/jidlo/IMG_9816.jpg", alt: "Kuřecí toast" },
  { src: "/images/jidlo/IMG_9880.jpg", alt: "Smažená ryba" },
  { src: "/images/jidlo/IMG_9882.jpg", alt: "Jídlo" },
  { src: "/images/jidlo/IMG_4705.jpg", alt: "Grilování" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="galerie" className="section" style={{ background: "var(--dark)", paddingBottom: 0 }}>
      <div className="wrap">
        <span className="section-label" style={{ textAlign: "center", display: "block" }}>Galerie</span>
        <div className="section-rule" style={{ margin: "0 auto 28px" }} />
        <h2 className="section-title" style={{ marginBottom: 48, textAlign: "center" }}>Nahlédněte k nám</h2>

      </div>
      <div className="gallery-strip" style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "280px",
          gap: 4,
        }}>
          {photos.map((photo, i) => (
            <div key={i} onClick={() => setLightbox(photo.src)}
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <Image src={photo.src} alt={photo.alt} fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Dark overlay on hover */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0)",
                transition: "background 0.3s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(237,35,35,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0)")}
              />
            </div>
          ))}
        </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.94)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <div style={{ position: "relative", width: "min(90vw, 1000px)", height: "min(85vh, 700px)" }}>
            <Image src={lightbox} alt="" fill style={{ objectFit: "contain" }} />
          </div>
          <button style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", opacity: 0.7 }}>✕</button>
        </div>
      )}
    </section>
  );
}
