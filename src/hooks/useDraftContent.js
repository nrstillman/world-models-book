import { useEffect, useState } from "react";

export default function useDraftContent(path, fallbackText) {
  const [content, setContent] = useState(fallbackText);

  useEffect(() => {
    let active = true;

    fetch(path, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          return "";
        }
        return response.text();
      })
      .then((text) => {
        if (active && text.trim()) {
          setContent(text);
        }
      })
      .catch(() => {
        // Keep fallback content when draft file is absent.
      });

    return () => {
      active = false;
    };
  }, [path, fallbackText]);

  return content;
}
