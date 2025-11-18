import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const siteDir = join(process.cwd(), "_site");

describe("build output", () => {
  beforeAll(() => {
    if (!existsSync(siteDir)) {
      throw new Error(
        "_site directory does not exist. Run npm run build first.",
      );
    }
  });

  it("generates index.html", () => {
    const indexPath = join(siteDir, "index.html");
    expect(existsSync(indexPath)).toBe(true);
  });

  it("generates CSS bundle", () => {
    const assetsDir = join(siteDir, "assets");
    const files = readdirSync(assetsDir);
    const cssFiles = files.filter((f) => f.endsWith(".css"));
    expect(cssFiles.length).toBeGreaterThan(0);
  });

  it("generates JS bundle", () => {
    const assetsDir = join(siteDir, "assets");
    const files = readdirSync(assetsDir);
    const jsFiles = files.filter((f) => f.endsWith(".js"));
    expect(jsFiles.length).toBeGreaterThan(0);
  });

  it("includes Tailwind CSS in the bundle", () => {
    const assetsDir = join(siteDir, "assets");
    const files = readdirSync(assetsDir);
    const cssFile = files.find((f) => f.endsWith(".css"));
    const cssPath = join(assetsDir, cssFile);
    const css = readFileSync(cssPath, "utf-8");
    expect(css.length).toBeGreaterThan(1000);
  });

  it("includes Tailwind utility classes in CSS", () => {
    const assetsDir = join(siteDir, "assets");
    const files = readdirSync(assetsDir);
    const cssFile = files.find((f) => f.endsWith(".css"));
    const cssPath = join(assetsDir, cssFile);
    const css = readFileSync(cssPath, "utf-8");
    expect(css).toMatch(/\.min-h-screen/);
    expect(css).toMatch(/\.bg-anu-black/);
    expect(css).toMatch(/\.text-anu-white/);
  });

  it("includes custom ANU color definitions in CSS", () => {
    const assetsDir = join(siteDir, "assets");
    const files = readdirSync(assetsDir);
    const cssFile = files.find((f) => f.endsWith(".css"));
    const cssPath = join(assetsDir, cssFile);
    const css = readFileSync(cssPath, "utf-8");
    expect(css).toContain("--color-anu-gold");
    expect(css).toContain("#be830e");
  });

  it("includes prose styling in CSS", () => {
    const assetsDir = join(siteDir, "assets");
    const files = readdirSync(assetsDir);
    const cssFile = files.find((f) => f.endsWith(".css"));
    const cssPath = join(assetsDir, cssFile);
    const css = readFileSync(cssPath, "utf-8");
    expect(css).toContain(".prose");
  });

  it("generates valid HTML with correct structure", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain('<html lang="en">');
    expect(html).toContain("LLMs Unplugged");
    expect(html).toContain('<link rel="stylesheet"');
    expect(html).toContain('href="/assets/');
    expect(html).toContain('<script type="module"');
    expect(html).toContain('src="/assets/');
  });

  it("includes key content in the HTML", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("LLMs Unplugged");
  });

  it("CSS is linked independently of JavaScript", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");

    // CSS should be linked as a stylesheet, not imported via JS
    const linkMatch = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"/);
    expect(linkMatch).toBeTruthy();

    // The CSS file should exist and be a hashed bundle
    const cssHref = linkMatch[1];
    expect(cssHref).toMatch(/\/assets\/main-[a-zA-Z0-9_-]+\.css$/);

    // Verify the CSS file exists
    const cssFileName = cssHref.replace("/assets/", "");
    const assetsDir = join(siteDir, "assets");
    const files = readdirSync(assetsDir);
    expect(files).toContain(cssFileName);
  });
});

describe("navigation", () => {
  it("includes semantic header with nav element", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("<header");
    expect(html).toContain("<nav");
    expect(html).toContain('aria-label="Main navigation"');
  });

  it("includes all navigation links", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/related/"');
    expect(html).toContain('href="/contact/"');
  });

  it("includes site branding link", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>\s*LLMs Unplugged\s*<\/a>/);
  });

  it("includes semantic main element", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("<main");
  });

  it("includes semantic footer", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("<footer");
    expect(html).toContain("Cybernetic Studio");
  });

  it("generates related page", () => {
    const relatedPath = join(siteDir, "related", "index.html");
    expect(existsSync(relatedPath)).toBe(true);
    const html = readFileSync(relatedPath, "utf-8");
    expect(html).toContain("Related resources");
  });

  it("generates contact page", () => {
    const contactPath = join(siteDir, "contact", "index.html");
    expect(existsSync(contactPath)).toBe(true);
    const html = readFileSync(contactPath, "utf-8");
    expect(html).toContain("Contact");
  });
});

describe("accessibility", () => {
  it("includes meta description for SEO", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain('<meta name="description"');
  });

  it("includes lang attribute on html element", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain('<html lang="en">');
  });

  it("includes viewport meta tag for responsive design", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain('<meta name="viewport"');
  });
});

describe("markdown processing", () => {
  it("converts --- to em dashes", () => {
    const indexPath = join(siteDir, "index.html");
    const html = readFileSync(indexPath, "utf-8");
    expect(html).toContain("using LLMs—knowledge");
  });
});
