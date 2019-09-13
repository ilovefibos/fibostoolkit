function HtmlWebpackChunkPrefix (options) {
  this.prefix = options.prefix;
}

HtmlWebpackChunkPrefix.prototype.apply = function(compiler) {
  const SELF = this;
  compiler.hooks.compilation.tap('HtmlWebpackChunkPrefix', function(compilation) {
    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('HtmlWebpackChunkPrefix', function(htmlPluginData, callback) {
      const { assets } = htmlPluginData;
      const js = assets.js.map(item => SELF.prefix + item);
      assets.js = js;
      if (callback) {
        return callback(null);
      } else {
        return;
      }
    });
  });
};

module.exports = HtmlWebpackChunkPrefix;
