// We don't want images to be nested in paragraph tags as it messes with figure markup.
module.exports = function removeParagraphImageWrapper(markdown) {
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
      if (token.children[0].type !== "image") {
        return;
      }
      // Check the surrounding tokens are paragraphs
      if (
        previousToken.type !== "paragraph_open" &&
        nextToken.type !== "paragraph_close"
      ) {
        return;
      }
      // Remove the paragraphs
      previousToken.hidden = true;
      nextToken.hidden = true;
    });
  }
  markdown.core.ruler.push("remove_paragraph_wrappers", replace);
};
