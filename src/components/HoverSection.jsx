import { useState } from "react";
import { customStyles } from "../styles/customStyles";

export default function HoverSection({
  leftLabel,
  rightLabel,
  title,
  children,
  defaultOpen = false,
  bordered = true,
  expandable = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={bordered ? customStyles.sectionBlock : undefined}>
      <div
        style={{
          ...customStyles.sectionHeaderRow,
          backgroundColor: isHovered ? "#4A3424" : "transparent",
          color: isHovered ? "#C2A383" : "#4A3424",
        }}
        onClick={() => {
          if (expandable) {
            setIsOpen((open) => !open);
          }
        }}
        role={expandable ? "button" : undefined}
        tabIndex={expandable ? 0 : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onKeyDown={(event) => {
          if (expandable && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            setIsOpen((open) => !open);
          }
        }}
      >
        <span style={customStyles.sectionLabel}>{leftLabel}</span>
        <span style={customStyles.sectionTitle}>{title || ""}</span>
        <span style={customStyles.sectionMeta}>{rightLabel}</span>
      </div>
      {expandable && isOpen ? (
        <div style={customStyles.sectionContent}>{children}</div>
      ) : null}
    </section>
  );
}
