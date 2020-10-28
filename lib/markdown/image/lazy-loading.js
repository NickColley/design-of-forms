module.exports = function lazyLoading(markdown) {
  var defaultRenderer = markdown.renderer.rules.image;
  markdown.renderer.rules.image = function (tokens, index, options, env, self) {
    var token = tokens[index];
    token.attrSet("loading", "lazy");
    return defaultRenderer(tokens, index, options, env, self);
  };
};
