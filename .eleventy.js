const { groupByNested, sortNested } = require('./lib/filters.js')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/favicon.ico")
    eleventyConfig.addPassthroughCopy("src/**/*.png")
    eleventyConfig.addPassthroughCopy("src/**/*.jpg")

    function getNestedPropertyValue (selector, originalObject) {
        let keys = selector.split('.');
        let value = keys.reduce((object, key) => object[key], originalObject);
        return value;
    }

    eleventyConfig.addNunjucksFilter("groupByNested", groupByNested)
    eleventyConfig.addNunjucksFilter("sortNested", sortNested)

    return {
        dir: {
            input: "src"
        }
    }
}
