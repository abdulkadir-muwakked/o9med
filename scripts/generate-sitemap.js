// Pure JS sitemap generator for static export
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "_posts");
const baseUrl = "https://o9med-rjb2.vercel.app";

const slugs = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));

const urls = slugs.map((slug) => {
  const realSlug = slug.replace(/\.md$/, "");
  return `  <url>\n    <loc>${baseUrl}/posts/${realSlug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n${urls.join("\n")}\n</urlset>`;

fs.writeFileSync("public/sitemap.xml", sitemap);
console.log("Sitemap generated with", slugs.length, "posts.");