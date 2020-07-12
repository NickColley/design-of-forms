const markdown = require("markdown-it")
const attributes = require('markdown-it-attrs')
const alternativeTextLineBreaks = require('./image/alternative-text-line-breaks.js')
const removeParagraphImageWrapper = require('./image/remove-paragraph-wrappers.js')
const imageLazyLoading = require('./image/lazy-loading.js')
const imageAnchorId = require('./image/anchor-id.js')
const imageMultipleFormats = require('./image/multiple-formats.js')
const imageSizeAttributes = require("./image/size-attributes.js")

const options = {
    html: true
}

module.exports =  markdown(options)
                    .use(attributes)
                    .use(alternativeTextLineBreaks)
                    .use(imageLazyLoading)
                    .use(imageAnchorId)
                    .use(removeParagraphImageWrapper)
                    .use(imageSizeAttributes)
                    .use(imageMultipleFormats)
