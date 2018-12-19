var Encore = require('@symfony/webpack-encore')

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .addEntry('js/theme', './assets/js/theme.js')
  .addStyleEntry('css/theme', './assets/css/theme.scss')

  .enableSassLoader()
  .enablePostCssLoader()

  .configureBabel(function (babelConfig) {
    babelConfig.presets[0][1].targets = {
      browsers: 'last 2 versions',
      uglify: false
    }
  })

module.exports = Encore.getWebpackConfig()
