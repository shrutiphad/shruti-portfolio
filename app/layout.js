// Fonts are self-hosted (no Google Fonts request at runtime).
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://shrutiphad.tech"),
  title: "Shruti Phad — GTM Engineer",
  description:
    "GTM engineer building the pipelines, agents and attribution behind revenue — and the full-stack software underneath them.",
  openGraph: {
    title: "Shruti Phad — GTM Engineer",
    description:
      "GTM engineer building the pipelines, agents and attribution behind revenue — and the full-stack software underneath them.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Cursor />
        <Nav />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
