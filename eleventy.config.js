import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, { baseHref: pathPrefix });
  eleventyConfig.addPassthroughCopy({ "assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    pathPrefix,
    dir: { input: "src", includes: "_includes", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
