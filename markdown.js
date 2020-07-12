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
        const ratio = 1.3
        width = Math.floor(width / ratio)
        height = Math.floor(height / ratio)
        if (dimensions) {
          token.attrSet('width', width)
          token.attrSet('height', height)
        }
        token.attrSet('id', 'image-' + imageSource.replace(/.*\/(.+)\.jpg/g, '$1'))
        token.attrSet('loading', 'lazy')

        const webpFilepath = imageSource.replace('.jpg', '.webp')
        const webpExists = fs.existsSync('src' + webpFilepath)
        return `
          <picture>
            ${webpExists ? `<source srcset="${webpFilepath}" type="image/webp">` : ''}
            ${defaultImageRenderer(tokens, index, options, env, self)}
          </picture>
        `
      } else {
        return defaultImageRenderer(tokens, index, options, env, self);
      }
    };
  };

  // We don't want images to be nested in paragraph tags as it messes with figure markup.
  function removeParagraphImageWrapper(markdown) {
    function replace(state) {
      state.tokens.forEach((token, index) => {
        const previousToken = state.tokens[index - 1];
        const nextToken = state.tokens[index + 1];
        if (!previousToken || !nextToken || !token) {
          return;
        }
        // We only want to do a transform is there's one child
        if (!token.children || token.children.length !== 1) {
          return;
        }
        // Check the current token child is an image
        if(token.children[0].type !== 'image') {
          return;
        }
        // Check the surrounding tokens are paragraphs
        if (
          previousToken.type !== 'paragraph_open' &&
          nextToken.type !== 'paragraph_close'
        ) {
          return;
        }
        // Remove the paragraphs
        previousToken.hidden = true;
        nextToken.hidden = true;
      })
    }
    markdown.core.ruler.push('remove_paragraph_wrappers', replace);
  };

module.exports =  markdown(options)
                    .use(imageSizeAttributes)
                    .use(attributes)
                    .use(removeParagraphImageWrapper)
