var Encore = require('@symfony/webpack-encore')

Encore
  .enableSingleRuntimeChunk()
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .addEntry('js/theme', './assets/js/theme.js')
  .addEntry('js/SoundCloud', './assets/js/SoundCloud.js')
  .addStyleEntry('css/theme', './assets/css/theme.scss')
  .addStyleEntry('css/numbers', './assets/css/numbers.scss')
  .addStyleEntry('css/index', './assets/css/index.scss')

  .enableSassLoader()
  .enablePostCssLoader()

  .configureBabel(function (babelConfig) {
    babelConfig.presets[0][1].targets = {
      browsers: 'last 2 versions',
      uglify: false
    }
  })

module.exports = Encore.getWebpackConfig()
