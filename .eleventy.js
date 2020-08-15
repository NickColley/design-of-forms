const fg = require('fast-glob');
const cheerio = require('cheerio');

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
            const $ = cheerio.load(content);
            $('ol,ul').attr('role', 'list');
            $('li').attr('role', 'listitem');
            content = $.html();
        }
        return content;
    });

    // Make figures work better
    // https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html
    eleventyConfig.addTransform("semantic-figure", async function(content, outputPath) {
        if(outputPath.endsWith(".html")) {
            const $ = cheerio.load(content);
            $('figure').each(function () {
                const $figure = $(this);
                const $caption = $figure.find('figcaption');
                $figure.attr('role', 'figure');
                $figure.attr('aria-label', $caption.text().trim());
            })
            content = $.html();
        }
        return content;
    });

    return {
        dir: {
            input: "src"
        }
    }
}
