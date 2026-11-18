import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#14130f",
          color: "#f7f2e9",
          fontSize: 40,
          fontWeight: 700,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
        }}
      >
        R
      </div>
    ),
    size,
  );
}
