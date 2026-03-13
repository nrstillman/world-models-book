import { useState } from "react";
import { customStyles } from "../styles/customStyles";

export default function DropdownItem({ num, title, page, href, muted = false }) {
  const [hovered, setHovered] = useState(false);
  const active = !muted && hovered;

  const itemStyle = {
    ...customStyles.tocItem,
    backgroundColor: active ? "#4A3424" : "transparent",
    color: active ? "#C2A383" : muted ? "rgba(74, 52, 36, 0.5)" : "#4A3424",
    cursor: muted ? "default" : customStyles.tocItem.cursor,
  };

  const content = (
    <>
      <span style={customStyles.tocNum}>{num}</span>
      <span style={customStyles.tocTitle}>{title}</span>
      {page ? <span style={customStyles.tocPage}>{page}</span> : null}
    </>
  );

  return (
    <li
      style={itemStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {href ? (
        <a
          href={href}
          style={{ color: "inherit", textDecoration: "none", display: "contents" }}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}
