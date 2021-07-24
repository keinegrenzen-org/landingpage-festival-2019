const Encore = require('@symfony/webpack-encore')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

Encore
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

  .configureImageRule({
    type: 'asset',
    maxSize: 8 * 1024,
    filename: 'images/[name].[fullhash:8].[ext]'
  })

  .configureFontRule({
    type: 'asset',
    filename: 'fonts/[name].[fullhash:8].[ext]'
  })

if (Encore.isProduction()) {
  Encore
    .enablePostCssLoader()
    .enableVersioning()
    .configureTerserPlugin(function (options) {
      options.extractComments = false
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
    .configureFilenames({
      js: '[name].[contenthash].js',
      css: '[name].[contenthash].css'
    })
}

if (process.env.ANALYZE) {
  Encore.addPlugin(new BundleAnalyzerPlugin())
}

if (Encore.isDevServer()) {
  Encore
    .disableCssExtraction()
    .enableSourceMaps()
    .configureDevServerOptions(options => {
      // hotfix for webpack-dev-server 4.0.0rc0
      // @see: https://github.com/symfony/webpack-encore/issues/951#issuecomment-840719271

      delete options.client;

      options.https = {
        pfx: path.join(process.env.HOME, '.symfony/certs/default.p12')
      }
    })
}

const config = Encore.getWebpackConfig()

config.optimization = {
  minimize: Encore.isProduction()
}

module.exports = config
