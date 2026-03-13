import { useState } from "react";
import { customStyles } from "../styles/customStyles";

export default function NavRow({ leftLabel, title, rightLabel, href, muted = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const active = !muted && isHovered;

  const rowStyle = {
    ...customStyles.sectionHeaderRow,
    backgroundColor: active ? "#4A3424" : "transparent",
    color: active ? "#C2A383" : muted ? "rgba(74, 52, 36, 0.5)" : "#4A3424",
    textDecoration: "none",
    cursor: muted ? "default" : customStyles.sectionHeaderRow.cursor,
  };

  const content = (
    <>
      <span style={customStyles.sectionLabel}>{leftLabel}</span>
      <span style={customStyles.sectionTitle}>{title}</span>
      <span style={customStyles.sectionMeta}>{rightLabel}</span>
    </>
  );

  if (muted || !href) {
    return (
      <div
        style={rowStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      style={rowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {content}
    </a>
  );
}
