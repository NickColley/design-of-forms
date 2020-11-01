const { groupByNested } = require("./lib/filters.js");
const markdown = require("./lib/markdown");
const semanticLists = require("./lib/transforms/semantic-lists.js");
const counterStartLists = require("./lib/transforms/counter-start-lists.js");
const sortedPages = require("./lib/collections/sorted-pages.js");
const gallery = require("./lib/collections/gallery.js");
const accessibilityPlugin = require("eleventy-plugin-accessibility");
const rssPlugin = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  if (process.env.NODE_ENV === "test") {
    eleventyConfig.addPlugin(accessibilityPlugin);
  }
  eleventyConfig.addPlugin(rssPlugin);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");

  eleventyConfig.addNunjucksFilter("groupByNested", groupByNested);

  eleventyConfig.setLibrary("md", markdown);
  eleventyConfig.addTransform("semantic-lists", semanticLists);
  eleventyConfig.addTransform("counter-start-lists", counterStartLists);

  // Sort pages based on order in the original book.
  eleventyConfig.addCollection("sortedPages", sortedPages);
  eleventyConfig.addCollection("gallery", gallery(markdown));

  return {
    dir: {
      input: "src",
    },
  };
};
