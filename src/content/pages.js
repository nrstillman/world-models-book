import parseFrontmatter from "../utils/parseFrontmatter";

const files = import.meta.glob("./pages/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const pagesByKey = Object.fromEntries(
  Object.entries(files).map(([path, raw]) => {
    const key = path.split("/").pop().replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return [key, { ...meta, body }];
  }),
);

export function getPageContent(key, fallbackTitle, fallbackBody) {
  const page = pagesByKey[key];
  if (!page) {
    return { title: fallbackTitle, body: fallbackBody };
  }
  return {
    title: page.title || fallbackTitle,
    body: page.body || fallbackBody,
  };
}
