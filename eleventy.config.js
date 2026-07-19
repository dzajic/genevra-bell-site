export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
