import { getPageContent } from "../content/pages";
import { customStyles } from "../styles/customStyles";
import renderMarkdownBlocks from "../utils/renderMarkdownBlocks";

export default function AboutPage() {
  const aboutPage = getPageContent("about", "About", "Draft template hidden for now.");

  return (
    <div style={{ ...customStyles.body, ...customStyles.aboutPage }}>
      <main style={customStyles.aboutInner}>
        <a href="/" style={customStyles.aboutNav}>
          [back]
        </a>
        <h1 style={customStyles.aboutTitle}>{aboutPage.title}</h1>
        {renderMarkdownBlocks(aboutPage.body, customStyles.aboutParagraph, customStyles.introSection)}
      </main>
    </div>
  );
}
