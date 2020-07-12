module.exports = function anchorId (markdown) {
    var defaultRenderer = markdown.renderer.rules.image;
    markdown.renderer.rules.image = function (tokens, index, options, env, self) {
        var token = tokens[index];
        const imageSource = token.attrGet('src')
        token.attrSet('id', 'image-' + imageSource.replace(/.*\/(.+)\.jpg/g, '$1'))
        return defaultRenderer(tokens, index, options, env, self);
    }
}
