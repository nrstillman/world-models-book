import parseFrontmatter from "../utils/parseFrontmatter";

const partConfig = [
  { key: "representations", leftLabel: "Part I", rightLabel: "[Representations]", title: "Representations" },
  { key: "models", leftLabel: "Part II", rightLabel: "[Models]", title: "Models" },
  { key: "agency", leftLabel: "Part III", rightLabel: "[Agency]", title: "Agency" },
];

const files = import.meta.glob("./chapters/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const chapterList = Object.entries(files)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const order = Number(meta.order || 0);
    const slug = meta.slug || path.split("/").pop().replace(/\.md$/, "");
    const draft = String(meta.draft || "").toLowerCase() === "true";
    return {
      path,
      slug,
      title: meta.title || slug,
      part: meta.part || "representations",
      order,
      page: meta.page || "",
      draft,
      body,
    };
  })
  .sort((a, b) => a.order - b.order);

const chaptersByPart = partConfig.map((part) => ({
  ...part,
  chapters: chapterList
    .filter((chapter) => chapter.part === part.key)
    .map((chapter) => ({
      ...chapter,
      num: `${String(chapter.order).padStart(2, "0")}.`,
      href: chapter.draft ? null : `/chapters/${chapter.slug}`,
    })),
}));

const chaptersBySlug = Object.fromEntries(chapterList.map((chapter) => [chapter.slug, chapter]));

function getChapterBySlug(slug) {
  return chaptersBySlug[slug] || null;
}

export { chaptersByPart, getChapterBySlug };
