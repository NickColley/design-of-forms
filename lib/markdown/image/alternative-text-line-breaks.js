// Avoid alternative text being rendered over one line with no spaces.
module.exports = function alternativeTextLineBreaks(markdown) {
  // https://github.com/markdown-it/markdown-it/blob/5789a3fe9693aa3ef6aa882b0f57e0ea61efafc0/lib/renderer.js#L89
  markdown.renderer.rules.image = function (tokens, index, options, env, self) {
    var token = tokens[index];
    token.attrs[token.attrIndex("alt")][1] = renderAlternativeText(
      token.children
    );
    return self.renderToken(tokens, index, options);
  };
};

// https://github.com/markdown-it/markdown-it/blob/5789a3fe9693aa3ef6aa882b0f57e0ea61efafc0/lib/renderer.js#L291
function renderAlternativeText(tokens) {
  return tokens
    .filter((token) => token.type === "text")
    .map((token) => token.content)
    .join("\n");
}
