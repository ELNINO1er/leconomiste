"use client";

/**
 * Dernier recours : une erreur survenue dans la mise en page racine elle-même.
 *
 * `error.tsx` ne peut pas la rattraper — il vit *à l'intérieur* de cette mise en
 * page. Ce fichier doit donc porter ses propres `<html>` et `<body>`, et ne
 * dépendre d'aucune feuille de style : si la racine a échoué, rien ne garantit
 * que le reste ait été chargé. D'où les styles écrits en dur.
 */
export default function ErreurGlobale({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="fr-CI">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0f151c",
          color: "#fff",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.18em", fontSize: 12, opacity: 0.7 }}>
            L’ÉCONOMISTE DE LA CÔTE D’IVOIRE
          </p>
          <h1 style={{ fontSize: 28, margin: "12px 0 8px" }}>Le site est momentanément indisponible</h1>
          <p style={{ opacity: 0.8, maxWidth: 460, margin: "0 auto 20px" }}>
            Nous rétablissons l’accès. Merci de réessayer dans quelques instants.
          </p>
          <button
            onClick={reset}
            style={{
              border: 0,
              borderRadius: 10,
              padding: "11px 20px",
              background: "#c4001d",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
