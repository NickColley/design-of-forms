const { groupByNested, sortNested } = require('./lib/filters.js')
const markdown = require('./markdown.js')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/favicon.ico")
    eleventyConfig.addPassthroughCopy("src/**/*.png")
    eleventyConfig.addPassthroughCopy("src/**/*.jpg")
    eleventyConfig.addPassthroughCopy("src/**/*.webp")

    eleventyConfig.addNunjucksFilter("groupByNested", groupByNested)
    eleventyConfig.addNunjucksFilter("sortNested", sortNested)

    eleventyConfig.setLibrary("md", markdown)

    return {
        dir: {
            input: "src"
        }
    }
}
