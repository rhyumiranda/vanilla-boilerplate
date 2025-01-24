import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {}
    }

  });

  eleventyConfig.addWatchTarget("./src/sass/**/*.scss");

  // Optimize BrowserSync config
  eleventyConfig.setBrowserSyncConfig({
    files: ['./_site/css/**/*.css'],
    open: true,
    notify: false,
    ghostMode: false,
    ui: false
  });

  eleventyConfig.addCollection("work", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/works/work/*.md");
  });

  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/js");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    pathPrefix: "/",
    htmlTemplateEngine: "njk"
  };
}
