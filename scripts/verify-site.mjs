import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = join(root, "out");
const failures = [];

function check(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function read(path) {
  return readFileSync(path, "utf8");
}

const requiredFiles = [
  "index.html",
  "privacy/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "og.png",
  "hero.webp",
  "structure.webp",
  "icon.svg",
];

for (const file of requiredFiles) {
  check(existsSync(join(outDir, file)), `missing out/${file}`);
}

const indexHtml = read(join(outDir, "index.html"));
const privacyHtml = read(join(outDir, "privacy/index.html"));
const notFoundHtml = read(join(outDir, "404.html"));

check(/<html[^>]+lang="en"/i.test(indexHtml), "index.html is missing lang=en");
check(
  /<title>[^<]*SevenTiming[^<]*<\/title>/i.test(indexHtml),
  "index.html is missing the SevenTiming title",
);
check(
  /<meta[^>]+name="description"[^>]+content="SevenTiming is an independent software studio/i.test(
    indexHtml,
  ),
  "index.html is missing the expected meta description",
);
check(
  /<link[^>]+rel="canonical"[^>]+href="https:\/\/seventiming\.com\/?"/i.test(
    indexHtml,
  ),
  "index.html is missing the canonical URL",
);
check(
  /<meta[^>]+property="og:image"[^>]+content="[^"]*\/og\.png"/i.test(indexHtml),
  "index.html is missing the Open Graph image",
);
check(
  indexHtml.includes("mailto:hello@seventiming.com"),
  "index.html is missing the contact email link",
);
check(
  /application\/ld\+json/.test(indexHtml) && indexHtml.includes("Organization"),
  "index.html is missing Organization structured data",
);
check(
  !indexHtml.includes("fonts.googleapis.com") &&
    !indexHtml.includes("fonts.gstatic.com"),
  "index.html still requests Google Fonts at runtime",
);
check(
  /<link[^>]+rel="icon"[^>]+href="[^"]*icon\.svg[^"]*"/i.test(indexHtml),
  "index.html is missing the SVG favicon",
);

for (const [name, html] of [
  ["index", indexHtml],
  ["privacy", privacyHtml],
  ["404", notFoundHtml],
]) {
  check(/<main[^>]+id="main"/.test(html), `${name} is missing main#main`);
  check(/<h1[\s>]/.test(html), `${name} is missing an h1`);
}

for (const section of ["work", "approach", "about", "contact"]) {
  check(
    new RegExp(`id="${section}"`).test(indexHtml),
    `index.html is missing #${section}`,
  );
}

const privacyMetadata = read(join(outDir, "privacy/index.html"));
check(
  /<link[^>]+rel="canonical"[^>]+href="https:\/\/seventiming\.com\/privacy\/"/i.test(
    privacyMetadata,
  ),
  "privacy page is missing its canonical URL",
);

const sitemap = read(join(outDir, "sitemap.xml"));
check(sitemap.includes("https://seventiming.com/"), "sitemap is missing the home URL");
check(
  sitemap.includes("https://seventiming.com/privacy/"),
  "sitemap is missing the privacy URL",
);
check(!sitemap.includes("seventimeing"), "sitemap still uses the old domain");

const robots = read(join(outDir, "robots.txt"));
check(
  robots.includes("Sitemap: https://seventiming.com/sitemap.xml"),
  "robots.txt is missing the sitemap directive",
);

for (const file of ["index.html", "privacy/index.html", "404.html"]) {
  const html = read(join(outDir, file));
  check(!html.includes("\u2014"), `${file} contains an em dash`);
  check(!html.includes("seventimeing"), `${file} contains the old domain`);
  check(!/lorem ipsum/i.test(html), `${file} contains Lorem ipsum`);
  check(!/\bTODO\b/.test(html), `${file} contains a TODO marker`);
  check(!/example\.com/i.test(html), `${file} contains example.com`);
  check(!/jane doe|acme inc/i.test(html), `${file} contains placeholder company copy`);
}

const sourceFiles = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === "node_modules" || entry === ".next" || entry === "out") {
      continue;
    }
    const stats = statSync(full);
    if (stats.isDirectory()) {
      walk(full);
    } else if (/\.(tsx?|css|md)$/.test(entry)) {
      sourceFiles.push(full);
    }
  }
}
walk(root);
for (const file of sourceFiles) {
  const text = read(file);
  if (text.includes("\u2014")) {
    failures.push(`${relative(root, file)} contains an em dash`);
  }
}

const assets = ["hero.webp", "structure.webp", "og.png"];
for (const asset of assets) {
  const path = join(outDir, asset);
  if (!existsSync(path)) continue;
  check(statSync(path).size > 25_000, `${asset} looks too small to be a real asset`);
}

const ogBuffer = readFileSync(join(outDir, "og.png"));
if (ogBuffer.length >= 24 && ogBuffer.subarray(1, 4).toString() === "PNG") {
  check(ogBuffer.readUInt32BE(16) === 1200, "og.png is not 1200px wide");
  check(ogBuffer.readUInt32BE(20) === 630, "og.png is not 630px high");
}

const ids = new Set(
  [...indexHtml.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]),
);

function checkPageLinks(html, pageName) {
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (
      value.startsWith("mailto:") ||
      value.startsWith("https://") ||
      value.startsWith("http://") ||
      value.startsWith("data:") ||
      value.startsWith("tel:")
    ) {
      continue;
    }

    const [pathPart, hash] = value.split("#");
    if (hash && ids.size > 0) {
      check(ids.has(hash), `${pageName} links to missing #${hash}`);
    }
    if (!pathPart.startsWith("/")) {
      continue;
    }

    const cleanPath = pathPart.split("?")[0];
    if (cleanPath === "/") continue;

    const candidates = cleanPath.endsWith("/")
      ? [join(outDir, cleanPath, "index.html")]
      : [
          join(outDir, cleanPath),
          join(outDir, cleanPath, "index.html"),
          join(outDir, `${cleanPath}.html`),
        ];

    check(
      candidates.some((candidate) => existsSync(candidate)),
      `${pageName} links to missing asset ${cleanPath}`,
    );
  }
}

checkPageLinks(indexHtml, "index.html");
checkPageLinks(privacyHtml, "privacy/index.html");

const allHtml = [indexHtml, privacyHtml, notFoundHtml].join("\n");
const h1Count = (indexHtml.match(/<h1[\s>]/g) || []).length;
check(h1Count === 1, `index.html should have exactly one h1, found ${h1Count}`);
check(
  !allHtml.includes("placeholder"),
  "output HTML contains the word placeholder",
);

if (failures.length > 0) {
  console.error("Site verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Site verification passed: ${requiredFiles.length} required files, metadata, links, copy, and assets are present.`,
);
