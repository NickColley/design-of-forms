const fs = require('fs')
const markdown = require("markdown-it")
const attributes = require('markdown-it-attrs')
const sizeOf = require('image-size')

const options = {
    html: true
}

function imageSizeAttributes(markdown, options) {
    var defaultImageRenderer = markdown.renderer.rules.image;
    markdown.renderer.rules.image = function (tokens, index, options, env, self) {
      var token = tokens[index];
      const filePath = 'src' + token.attrGet('src')
      if (filePath.endsWith('.jpg') && fs.existsSync(filePath)) {
          const dimensions = sizeOf(filePath)
          let { width, height } = dimensions;
          const ratio = 2
          width = Math.floor(width / ratio)
          height = Math.floor(height / ratio)
          if (dimensions) {
            token.attrSet('width', width)
            token.attrSet('height', height)
          }
          token.attrSet('loading', 'lazy')
      }

      return defaultImageRenderer(tokens, index, options, env, self)
    };
  };

module.exports =  markdown(options)
                    .use(imageSizeAttributes)
                    .use(attributes)
