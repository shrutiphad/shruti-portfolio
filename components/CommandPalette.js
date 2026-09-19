"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { projects, profile } from "@/lib/content";

const sections = [
  { label: "Top", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Where I've built", href: "/#experience" },
  { label: "Run the pipeline", href: "/#machine" },
  { label: "Beyond the stack", href: "/#leadership" },
  { label: "Toolkit", href: "/#toolkit" },
  { label: "Selected work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const links = [
  { label: "Email Shruti", href: `mailto:${profile.email}`, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "GitHub", href: profile.github, external: true },
  { label: "Substack — why, shruti", href: profile.substack, external: true },
  { label: "Résumé (PDF)", href: "/shruti-phad-resume.pdf", external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const items = useMemo(() => {
    const all = [
      ...sections.map((s) => ({ ...s, group: "Jump to" })),
      ...projects.map((p) => ({
        label: p.title,
        hint: p.status,
        href: `/projects/${p.slug}`,
        group: "Case studies",
      })),
      { label: "All projects", href: "/projects", group: "Case studies" },
      ...links.map((l) => ({ ...l, group: "Elsewhere" })),
    ];
    const term = q.trim().toLowerCase();
    if (!term) return all;
    return all.filter((item) => item.label.toLowerCase().includes(term));
  }, [q]);

  const run = useCallback(
    (item) => {
      if (!item) return;
      setOpen(false);
      if (item.external) {
        window.open(item.href, "_blank", "noopener");
        return;
      }
      router.push(item.href);
    },
    [router]
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("sp:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("sp:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      const id = setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(id);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => (v + 1) % Math.max(items.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => (v - 1 + items.length) % Math.max(items.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(items[i]);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="cmdk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            className="cmdk__box"
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <input
              ref={inputRef}
              className="cmdk__input"
              placeholder="Search sections, case studies, links…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setI(0);
              }}
              onKeyDown={onInputKey}
            />
            <div className="cmdk__list">
              {items.length === 0 ? (
                <div className="cmdk__group">No match</div>
              ) : null}
              {items.map((item, n) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <div key={`${item.label}-${n}`}>
                    {header ? <div className="cmdk__group">{header}</div> : null}
                    <button
                      type="button"
                      className="cmdk__item"
                      data-active={n === i ? "1" : "0"}
                      onMouseEnter={() => setI(n)}
                      onClick={() => run(item)}
                    >
                      {item.label}
                      {item.hint ? <span className="k">{item.hint}</span> : null}
                      {item.external ? <span className="k">↗</span> : null}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="cmdk__foot">
              <span>↑↓ move</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
