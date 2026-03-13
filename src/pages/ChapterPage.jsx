import { getChapterBySlug } from "../content/chapters";
import { customStyles } from "../styles/customStyles";
import renderMarkdownBlocks from "../utils/renderMarkdownBlocks";

export default function ChapterPage({ slug }) {
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return (
      <div style={{ ...customStyles.body, ...customStyles.introPage }}>
        <main style={customStyles.introInner}>
          <a href="/" style={customStyles.introNav}>
            [back]
          </a>
          <h1 style={customStyles.introTitle}>Chapter Not Found</h1>
        </main>
      </div>
    );
  }

  return (
    <div style={{ ...customStyles.body, ...customStyles.introPage }}>
      <main style={customStyles.introInner}>
        <a href="/" style={customStyles.introNav}>
          [back]
        </a>
        <h1 style={customStyles.introTitle}>{chapter.title}</h1>
        {renderMarkdownBlocks(chapter.body, customStyles.introParagraph, customStyles.introSection)}
      </main>
    </div>
  );
}
