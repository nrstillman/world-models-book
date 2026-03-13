import { useEffect } from "react";
import AboutPage from "./pages/AboutPage";
import ChapterPage from "./pages/ChapterPage";
import HomePage from "./pages/HomePage";
import { customStyles } from "./styles/customStyles";

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#cfb394";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.cursor = "crosshair";
    document.body.style.overflowX = "hidden";

    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      ::selection { background-color: #4A3424; color: #C2A383; }
      body { background-color: #cfb394; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const path = window.location.pathname;
  if (path === "/about") {
    return <AboutPage />;
  }
  if (path === "/intro") {
    return <ChapterPage slug="intro" />;
  }
  if (path.startsWith("/chapters/")) {
    const slug = path.replace("/chapters/", "");
    return <ChapterPage slug={decodeURIComponent(slug)} />;
  }
  return (
    <div style={customStyles.body}>
      <HomePage />
    </div>
  );
}
