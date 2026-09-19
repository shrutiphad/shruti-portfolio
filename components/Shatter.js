const COLS = 12;
const ROWS = 7;

/* Every panel carries this grid. As the next panel climbs over it, StackMotion
   writes --cover here and the tiles freeze the outgoing section into frosted
   glass panes, then drift apart and take it with them.
     --i   diagonal position, 0 top-left → 1 bottom-right (the stagger)
     --dx  horizontal direction away from centre, -1 → 1 (the drift)
     --dy  vertical direction away from centre
     --r   a fixed per-tile rotation sign, so the panes don't scatter uniformly */
const TILES = Array.from({ length: COLS * ROWS }, (_, n) => {
  const col = n % COLS;
  const row = Math.floor(n / COLS);
  return {
    i: (col + row) / (COLS + ROWS - 2),
    dx: (col - (COLS - 1) / 2) / ((COLS - 1) / 2),
    dy: (row - (ROWS - 1) / 2) / ((ROWS - 1) / 2),
    r: (((col * 7 + row * 13) % 5) - 2) / 2,
  };
});

export default function Shatter() {
  return (
    <>
      <div className="shatter" aria-hidden="true">
        {TILES.map((t, n) => (
          <i key={n} style={{ "--i": t.i, "--dx": t.dx, "--dy": t.dy, "--r": t.r }} />
        ))}
      </div>
      <span className="slide__sheen" aria-hidden="true" />
    </>
  );
}
