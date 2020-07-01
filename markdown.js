const markdown = require("markdown-it");
const anchor = require("markdown-it-anchor")

const options = {
    html: true
}

const anchorOptions = {
    permalink: true,
    permalinkBefore: true,
    permalinkSpace: false,
    permalinkAttrs: (slug, state) => {
        return {
            "aria-hidden": true,
            "tabindex": "-1",
        }
    }
}

module.exports = markdown(options).use(anchor, anchorOptions)
