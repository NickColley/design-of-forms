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
      const imageSource = token.attrGet('src')
      const filePath = 'src' + imageSource
      if (filePath.endsWith('.jpg') && fs.existsSync(filePath)) {
          const dimensions = sizeOf(filePath)
          let { width, height } = dimensions;
          const ratio = 1
          width = Math.floor(width / ratio)
          height = Math.floor(height / ratio)
          if (dimensions) {
            token.attrSet('width', width)
            token.attrSet('height', height)
          }
          token.attrSet('loading', 'lazy')
      }

      return `
<picture>
<source srcset="${imageSource.replace('.jpg', '.webp')}" type="image/webp">
${defaultImageRenderer(tokens, index, options, env, self)}
</picture>
`
    };
  };

module.exports =  markdown(options)
                    .use(imageSizeAttributes)
                    .use(attributes)
