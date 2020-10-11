const Encore = require('@symfony/webpack-encore')

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

  .addEntry('js/theme', './assets/js/theme.js')
  .addEntry('js/SoundCloud', './assets/js/SoundCloud.js')
  .addStyleEntry('css/theme', './assets/css/theme.scss')
  .addStyleEntry('css/numbers', './assets/css/numbers.scss')
  .addStyleEntry('css/index', './assets/css/index.scss')

  .enableSassLoader()
  .enablePostCssLoader()

  .configureUrlLoader({
    images: {
      esModule: false
    }
  })

  .configureTerserPlugin(function (options) {
    options.extractComments = false
    options.cache = false
    options.parallel = true
    options.terserOptions = {
      keep_classnames: false,
      mangle: true,
      compress: false,
      keep_fnames: false,
      output: {
        comments: false
      }
    }
  })

const config = Encore.getWebpackConfig()

config.target = 'web'

module.exports = config
