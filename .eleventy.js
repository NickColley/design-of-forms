module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")
    eleventyConfig.addPassthroughCopy("src/favicon.ico")
    eleventyConfig.addPassthroughCopy("src/**/*.png")
    eleventyConfig.addPassthroughCopy("src/**/*.jpg")

    // From https://github.com/mozilla/nunjucks/issues/1198#issuecomment-610494129
    eleventyConfig.addNunjucksFilter("groupByNested", function (arr, key) {
        const result = {};
        arr.forEach(item => {
            const keys = key.split('.');
            const value = keys.reduce((object, key) => object[key], item);
    
            (result[value] || (result[value] = [])).push(item);
        });
        return result;
    })

    return {
        dir: {
            input: "src"
        }
    }
}
