export const dynamic = "force-static";
import { getAllPosts } from "@/lib/api";

export async function GET() {
  const baseUrl = "https://o9medical.com";
  const posts = getAllPosts();

  const urls = posts.map(
    (post) => `  <url>\n    <loc>${baseUrl}/posts/${post.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n${urls.join("\n")}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
