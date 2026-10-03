import { profile } from "@/lib/content";
const icons = {
  X: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l7.3-8.4L.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L6.4 4H4.6l13.2 16Z",
  GitHub: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.59 9.59 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  LinkedIn: "M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 9h4v13H2Zm7 0h4v2c1-2 7-4 8 3v8h-4v-7c0-3-4-3-4 0v7H9Z",
  Substack: "M3 3h18v2H3Zm0 4h18v2H3Zm0 4h18v12l-9-5-9 5Z",
  Email: "M2 4h20v16H2V4Zm2 2 8 6 8-6H4Zm16 12V8l-8 6-8-6v10h16Z",
  Résumé: "M5 2h10l5 5v15H5V2Zm2 2v16h11V8h-5V4H7Zm2 7h7v2H9Zm0 4h7v2H9Z",
};
export default function SocialLinks() {
  const links = [["GitHub", profile.github], ["LinkedIn", profile.linkedin], ["Substack", profile.substack], ["X", profile.x], ["Email", `mailto:${profile.email}`], ["Résumé", "/shruti-phad-resume.pdf"]];
  return <div className="social-links">{links.map(([label, href]) => <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={icons[label]} /></svg><span>{label}</span></a>)}</div>;
}
