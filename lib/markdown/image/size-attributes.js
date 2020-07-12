const fs = require('fs')
const sizeOf = require('image-size')

module.exports = function sizeAttributes(markdown) {
    var defaultRenderer = markdown.renderer.rules.image;
    markdown.renderer.rules.image = function (tokens, index, options, env, self) {
        var token = tokens[index];
        const filePath = 'src' + token.attrGet('src')
        if (!filePath.endsWith('.jpg') || !fs.existsSync(filePath)) {
            return defaultRenderer(tokens, index, options, env, self);
        }
        const dimensions = sizeOf(filePath)
        let { width, height } = dimensions;
        const ratio = 1.3
        width = Math.floor(width / ratio)
        height = Math.floor(height / ratio)
        if (dimensions) {
            token.attrSet('width', width)
            token.attrSet('height', height)
        }
        return defaultRenderer(tokens, index, options, env, self);
    };
  };
