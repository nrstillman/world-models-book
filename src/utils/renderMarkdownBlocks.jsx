export default function renderMarkdownBlocks(content, paragraphStyle, sectionStyle) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={`h2-${index}`} style={sectionStyle}>
            {block.replace(/^##\s+/, "")}
          </h2>
        );
      }
      if (block.startsWith("# ")) {
        return (
          <h2 key={`h1-${index}`} style={sectionStyle}>
            {block.replace(/^#\s+/, "")}
          </h2>
        );
      }
      return (
        <p key={`p-${index}`} style={paragraphStyle}>
          {block}
        </p>
      );
    });
}
