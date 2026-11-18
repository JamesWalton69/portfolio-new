import { ImageResponse } from "next/og";
import { person } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name}, ${person.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f2e9",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 96, height: 96, background: "#ff5d2e" }} />
          <div style={{ width: 96, height: 96, background: "#2b4bff" }} />
          <div style={{ width: 96, height: 96, background: "#d6f75e" }} />
          <div style={{ width: 96, height: 96, background: "#ffc9de" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#14130f",
              maxWidth: 900,
            }}
          >
            {person.name}
          </div>
          <div style={{ fontSize: 32, color: "#6b655a", marginTop: 16 }}>
            {person.role}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
