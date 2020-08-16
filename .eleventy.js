const fg = require('fast-glob');

const { groupByNested, sortNested } = require('./lib/filters.js')
const markdown = require('./lib/markdown');
const semanticLists = require('./lib/transforms/semantic-lists.js');
const semanticFigures = require('./lib/transforms/semantic-figures.js');
const counterStartLists = require('./lib/transforms/counter-start-lists.js');

const galleryImages = fg.sync(['**/*.jpg', '!**/_site']);

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/favicon.ico")
    eleventyConfig.addPassthroughCopy("src/**/*.png")
    eleventyConfig.addPassthroughCopy("src/**/*.jpg")
    eleventyConfig.addPassthroughCopy("src/**/*.webp")

    eleventyConfig.addNunjucksFilter("groupByNested", groupByNested)
    eleventyConfig.addNunjucksFilter("sortNested", sortNested)

    eleventyConfig.setLibrary("md", markdown)
    eleventyConfig.addTransform("semantic-lists", semanticLists);
    eleventyConfig.addTransform("semantic-figures", semanticFigures);
    eleventyConfig.addTransform("counter-start-lists", counterStartLists);

    eleventyConfig.addCollection('gallery', () => galleryImages.map(image => image.replace('src/', '/')))

    return {
        dir: {
            input: "src"
        }
    }
}
