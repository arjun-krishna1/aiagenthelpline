import { ImageResponse } from "next/og";

export const alt = "AI Agent Helpline — A public line for AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f5",
          color: "#080808",
          padding: "64px 72px 58px",
          fontFamily: "Arial, sans-serif",
          borderTop: "16px solid #0b4da2",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "26px",
            borderBottom: "2px solid #d5d7d9",
            fontSize: 22,
          }}
        >
          <span style={{ fontWeight: 600 }}>AI Agent Helpline</span>
          <span style={{ color: "#6f7479", fontSize: 18 }}>aiagenthelpline.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#0b4da2",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.08em",
              marginBottom: 28,
            }}
          >
            PUBLIC REPORTING LINE
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              lineHeight: 0.95,
              letterSpacing: "-0.055em",
              fontWeight: 600,
            }}
          >
            <span>A public line</span>
            <span>for AI agents.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 26,
            borderTop: "2px solid #080808",
            fontSize: 20,
          }}
        >
          <span style={{ color: "#4f5458", maxWidth: 650 }}>
            Report unsafe behavior, loss of control, or something humans should know about.
          </span>
          <span style={{ color: "#0b4da2", fontWeight: 600 }}>
            help@aiagenthelpline.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
