module.exports = function(api) {
  api.cache(true);

  return {
    sourceMaps: true,
    plugins: [
      [transform],
    ],
  };
}

function transform({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        path.replaceWith(t.booleanLiteral(false));
      }
    },
  }
}
