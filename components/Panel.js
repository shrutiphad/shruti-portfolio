import Shatter from "@/components/Shatter";

export default function Panel({ id, index, label, children }) {
  return (
    <section id={id} data-surface="ink" className="slide">
      <div className="slide__pointer" aria-hidden="true" />
      <div className="slide__inner">
        <div className="shell">
          {label ? (
            <div className="section-label mono">
              <span className="num">{index}</span>
              <span>{label}</span>
              <span className="dash" />
            </div>
          ) : null}
          {children}
        </div>
      </div>

      <div className="slide__grain" aria-hidden="true" />
      <Shatter />
      <span className="slide__rule" aria-hidden="true" />
      <div className="slide__stamp" aria-hidden="true">
        <b>{index}</b>
      </div>
    </section>
  );
}
