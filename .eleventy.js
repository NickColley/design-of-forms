const fg = require('fast-glob');

const { groupByNested, sortNested } = require('./lib/filters.js')
const markdown = require('./lib/markdown')

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

    // Make sure styled lists keep their correct semantics.
    // https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
    eleventyConfig.addTransform("semantic-lists", async function(content, outputPath) {
        if(outputPath.endsWith(".html")) {
            content = content.replace(/<ol( .*)>/g, '<ol role="list"$1>')
            content = content.replace(/<ol>/g, '<ol role="list">')
            content = content.replace(/<ul( .*)>/g, '<ul role="list"$1>')
            content = content.replace(/<ul>/g, '<ul role="list">')
            content = content.replace(/<li( .*)>/g, '<li role="listitem"$1>')
            content = content.replace(/<li>/g, '<li role="listitem">')
        }
        return content;
    });

    return {
        dir: {
            input: "src"
        }
    }
}
