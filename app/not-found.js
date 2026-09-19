import Link from "next/link";

export default function NotFound() {
  return (
    <main data-surface="ink" className="page">
      <div className="shell">
        <div className="mono" style={{ color: "var(--faint)", marginBottom: "1.2rem" }}>
          404
        </div>
        <h1 className="display" style={{ maxWidth: "16ch" }}>
          Nothing <em className="hl hl-blue">here</em>.
        </h1>
        <p style={{ marginTop: "1.6rem", maxWidth: "42ch" }}>
          The page you were after does not exist — or it moved and I did not redirect it, which is
          worse.
        </p>
        <Link href="/" className="back mono" data-cursor="link" style={{ marginTop: "2rem", display: "inline-flex" }}>
          <span>←</span>
          <span>Back home</span>
        </Link>
      </div>
    </main>
  );
}
