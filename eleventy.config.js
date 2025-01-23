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
