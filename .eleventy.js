const fg = require('fast-glob');

const { groupByNested, sortNested } = require('./lib/filters.js')
const markdown = require('./markdown.js')

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
    eleventyConfig.addCollection('gallery', () => galleryImages.map(image => image.replace('src/', '/')))

    return {
        dir: {
            input: "src"
        }
    }
}
