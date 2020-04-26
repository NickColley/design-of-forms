const { groupByNested, sortNested } = require('./lib/filters.js')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/favicon.ico")
    eleventyConfig.addPassthroughCopy("src/**/*.png")
    eleventyConfig.addPassthroughCopy("src/**/*.jpg")

    eleventyConfig.addNunjucksFilter("groupByNested", groupByNested)
    eleventyConfig.addNunjucksFilter("sortNested", sortNested)

    return {
        dir: {
            input: "src"
        }
    }
}
