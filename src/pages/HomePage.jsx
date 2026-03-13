import { useEffect, useRef, useState } from "react";
import AsciiCanvas from "../components/AsciiCanvas";
import DropdownItem from "../components/DropdownItem";
import HoverSection from "../components/HoverSection";
import NavRow from "../components/NavRow";
import { chaptersByPart, getChapterBySlug } from "../content/chapters";
import { customStyles } from "../styles/customStyles";

export default function HomePage() {
  const [containerPadding, setContainerPadding] = useState("2rem");
  const [aboutHovered, setAboutHovered] = useState(false);
  const heroTitleRef = useRef(null);

  useEffect(() => {
    const updatePadding = () => {
      setContainerPadding(window.innerWidth >= 1024 ? "1rem 4rem 2rem" : "1rem 2rem 2rem");
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

  const introChapter = getChapterBySlug("intro");
  const introIsDraft = Boolean(introChapter?.draft);

  return (
    <div style={{ ...customStyles.sysContainer, ...customStyles.root, padding: containerPadding }}>
      <header style={customStyles.header}>
        <div style={customStyles.metaBlock}>
          <a
            href="/about"
            style={{
              ...customStyles.metaLink,
              borderBottomColor: aboutHovered ? "#4A3424" : "transparent",
            }}
            onMouseEnter={() => setAboutHovered(true)}
            onMouseLeave={() => setAboutHovered(false)}
            onFocus={() => setAboutHovered(true)}
            onBlur={() => setAboutHovered(false)}
          >
            About
          </a>
        </div>
        <div style={customStyles.metaBlock}>
          <span>In Progress</span>
        </div>
        <div style={{ ...customStyles.metaBlock, textAlign: "right" }}>
          <span>Exp. 2027</span>
        </div>
      </header>

      <section style={customStyles.hero}>
        <AsciiCanvas anchorRef={heroTitleRef} />
        <h1 ref={heroTitleRef} style={customStyles.heroTitle}>
          world
          <br />
          models
        </h1>
      </section>

      <main style={customStyles.main}>
        <section style={customStyles.introBlock}>
          <h2 style={customStyles.h2}>World Models Book</h2>
          <p style={customStyles.p}>
            Upcoming book outlining both theory and practical steps to implementing world models, covering recent
            advances in learned representations and how these can lead to coherent interactive environments.
          </p>
        </section>

        <section style={customStyles.sectionBlock}>
          <NavRow
            leftLabel="Introduction"
            title=""
            rightLabel="[intro]"
            href={introIsDraft ? null : "/intro"}
            muted={introIsDraft}
          />
        </section>

        {chaptersByPart.map((part) => (
          <HoverSection
            key={part.key}
            leftLabel={part.leftLabel}
            rightLabel={part.rightLabel}
            title={part.title}
          >
            <ul style={customStyles.tocList}>
              {part.chapters.map((chapter) => (
                <DropdownItem
                  key={chapter.slug}
                  num={chapter.num}
                  title={chapter.title}
                  page={chapter.page}
                  href={chapter.href}
                  muted={chapter.draft}
                />
              ))}
            </ul>
          </HoverSection>
        ))}

        <HoverSection leftLabel="Appendix" rightLabel="" title="" bordered={false}>
          <div />
        </HoverSection>
      </main>

      <footer style={customStyles.sysFooter}>
        <span>© 2026 Namid Stillman · worldmodelsbook.com</span>
        <a href="https://github.com/nrstillman/world-models-book" style={customStyles.footerLink}>
          [git]
        </a>
      </footer>
    </div>
  );
}
