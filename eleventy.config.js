import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import interlinker from "@photogabble/eleventy-plugin-interlinker";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("public");

  // Configure markdown-it with typographer for em dashes and smart quotes
  const md = markdownIt({
    html: true,
    typographer: true,
  }).use(markdownItFootnote);

  // Customize footnote rendering to use Tailwind classes
  md.renderer.rules.footnote_block_open = () =>
    '<hr class="border-anu-gold my-12">\n' +
    '<section class="footnotes text-sm mt-12">\n' +
    '<ol class="list-decimal pl-6">\n';

  md.renderer.rules.footnote_block_close = () => "</ol>\n" + "</section>\n";

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPlugin(interlinker, {
    deadLinkReport: "console",
    errorOnDeadLinks: true,
  });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      base: "/",
      plugins: [tailwindcss()],
      build: {
        rollupOptions: {
          input: {
            main: "src/assets/main.js",
            styles: "src/assets/main.css",
          },
        },
      },
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    pathPrefix: "/",
  };
}
