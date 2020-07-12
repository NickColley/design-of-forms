const fs = require('fs');

module.exports = function multipleFormats (markdown) {
    var defaultRenderer = markdown.renderer.rules.image;
    markdown.renderer.rules.image = function (tokens, index, options, env, self) {
        var token = tokens[index];
        const imageSource = token.attrGet('src')
        if (!imageSource.endsWith('.jpg') || !fs.existsSync('src' + imageSource)) {
            return defaultRenderer(tokens, index, options, env, self);
        }
        const webpFilepath = imageSource.replace('.jpg', '.webp')
        const webpExists = fs.existsSync('src' + webpFilepath)
        return `<picture>
    ${webpExists ? `<source srcset="${webpFilepath}" type="image/webp">` : ''}
    ${defaultRenderer(tokens, index, options, env, self)}
</picture>`
    };
}
