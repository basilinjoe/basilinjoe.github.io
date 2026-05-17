import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const alt = "Basilin Joe — Technology Lead & Cloud Solutions Architect"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ width: 64, height: 6, background: "#3b82f6", borderRadius: 3, marginBottom: 40, display: "flex" }} />

        <div style={{ fontSize: 64, fontWeight: 800, color: "#f8fafc", lineHeight: 1.1, marginBottom: 20, display: "flex" }}>
          Basilin Joe
        </div>

        <div style={{ fontSize: 28, fontWeight: 500, color: "#93c5fd", marginBottom: 40, display: "flex" }}>
          Technology Lead &amp; Cloud Solutions Architect
        </div>

        <div style={{ fontSize: 20, color: "#94a3b8", maxWidth: 700, lineHeight: 1.5, display: "flex" }}>
          Azure · AWS · Kubernetes · DevOps · Full Stack
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 18,
            color: "#475569",
            display: "flex",
          }}
        >
          basilinjoe.github.io
        </div>
      </div>
    ),
    { ...size }
  )
}
