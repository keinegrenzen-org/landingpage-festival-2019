const Encore            = require('@symfony/webpack-encore')
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')

Encore
  .enableBuildNotifications(true)

  .enableSingleRuntimeChunk()
  .splitEntryChunks()

  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .setManifestKeyPrefix('build/')

  .cleanupOutputBeforeBuild()

  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .enableSassLoader()
  .enablePostCssLoader()

  .enableSassLoader()
  .enablePostCssLoader()
  .configureBabel(
    function (babelConfig) {
      babelConfig.presets[0][1].targets = {
        browsers: 'last 2 versions',
      }
    },
    {
      useBuiltIns: 'usage',
      corejs: '3'
    }
  )

  .addEntry('js/theme', './assets/js/theme.js')
  .addEntry('js/SoundCloud', './assets/js/SoundCloud.js')
  .addStyleEntry('css/theme', './assets/css/theme.scss')
  .addStyleEntry('css/numbers', './assets/css/numbers.scss')
  .addStyleEntry('css/index', './assets/css/index.scss')

if (Encore.isProduction()) {
  Encore.addPlugin(
    new BabelMinifyPlugin(
      {removeConsole: true},
      {comments: false}
    )
  )
}

module.exports = Encore.getWebpackConfig()
