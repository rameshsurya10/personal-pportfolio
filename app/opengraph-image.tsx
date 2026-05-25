import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d0a08",
          color: "#efeae3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Monogram box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#efeae3",
            color: "#0d0a08",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          RA
        </div>

        {/* Name */}
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1, color: "#efeae3" }}>
          {site.name}
        </div>

        {/* Role */}
        <div style={{ fontSize: 36, color: "#efeae3", marginTop: 16, fontWeight: 600 }}>
          {site.role}
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 24, color: "#8a8278", marginTop: 32, maxWidth: 900 }}>
          {site.tagline}
        </div>
      </div>
    ),
    size
  );
}
