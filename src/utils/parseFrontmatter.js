export default function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: raw.trim() };
  }

  const [, frontmatter, body] = match;
  const meta = {};

  frontmatter.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) {
      return;
    }
    meta[key.trim()] = rest.join(":").trim();
  });

  return { meta, body: body.trim() };
}
