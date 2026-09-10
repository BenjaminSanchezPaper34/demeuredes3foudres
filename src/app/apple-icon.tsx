import { ImageResponse } from "next/og";

/**
 * Icône iOS. Générée à la construction : pas de binaire à maintenir dans le
 * dépôt. Provisoire — à remplacer par un vrai dessin de marque quand la
 * mini-charte sera produite (DESIGN.md).
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2a2926",
        }}
      >
        <div
          style={{
            width: 116,
            height: 116,
            borderRadius: "50%",
            border: "10px solid #6e2b2b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#efe9de",
            fontSize: 68,
            fontFamily: "Georgia, serif",
          }}
        >
          3
        </div>
      </div>
    ),
    size,
  );
}
