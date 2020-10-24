const fg = require('fast-glob');

const { groupByNested } = require('./lib/filters.js')
const markdown = require('./lib/markdown');
const semanticLists = require('./lib/transforms/semantic-lists.js');
const counterStartLists = require('./lib/transforms/counter-start-lists.js');

const galleryImages = fg.sync(['**/*.jpg', '!**/_site']);

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/favicon.ico")
    eleventyConfig.addPassthroughCopy("src/**/*.png")
    eleventyConfig.addPassthroughCopy("src/**/*.jpg")
    eleventyConfig.addPassthroughCopy("src/**/*.webp")

    eleventyConfig.addNunjucksFilter("groupByNested", groupByNested)

    eleventyConfig.setLibrary("md", markdown)
    eleventyConfig.addTransform("semantic-lists", semanticLists);
    eleventyConfig.addTransform("counter-start-lists", counterStartLists);

    eleventyConfig.addCollection('gallery', () => galleryImages.map(image => image.replace('src/', '/')))

    // Sort pages based on order in the original book.
    eleventyConfig.addCollection("sortedPages", function(collectionApi) {
        const pages = collectionApi.getFilteredByTag("page");
        pages.sort((pageA, pageB) => {
            const startA = pageA.data.pageNumber && pageA.data.pageNumber.start;
            const endA = pageA.data.pageNumber && pageA.data.pageNumber.end;
            const startB = pageB.data.pageNumber && pageB.data.pageNumber.start;
            const endB = pageB.data.pageNumber && pageB.data.pageNumber.end;
            if (startA > startB) {
                return 1;
            }
            if (startA < startB) {
                return -1;
            }
            // If the start numbers match check the end pages so that
            // Content on the same page comes first.
            if (endA > endB) {
                return 1;
            }
            if (endA < endB) {
                return -1;
            }
            return 0;
        });
        return pages;
    });

    return {
        dir: {
            input: "src"
        }
    }
}
