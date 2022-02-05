const Encore = require('@symfony/webpack-encore')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const buildType = process.env.BROWSERSLIST_ENV
const isModern = buildType === 'modern'

Encore
  .enableSingleRuntimeChunk()
  .splitEntryChunks()

  .setOutputPath(`public/build/${buildType}/`)
  .setPublicPath(`/build/${buildType}`)
  .setManifestKeyPrefix(`build/${buildType}`)
  .cleanupOutputBeforeBuild()

  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .addEntry('theme', './assets/js/theme.js')
  .addEntry('soundcloud', './assets/js/SoundCloud.js')

  .addStyleEntry('numbers', './assets/css/numbers.scss')
  .addStyleEntry('index', './assets/css/index.scss')

  .enableSassLoader()
  .enablePostCssLoader()

  .configureImageRule({
    type: isModern ? 'asset' : 'asset/resource',
    maxSize: isModern ? 8 * 1024 : undefined,
    filename: 'images/[name].[contenthash][ext]'
  })

  .configureFontRule({
    type: 'asset',
    filename: 'fonts/[name].[contenthash][ext]'
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
}

const config = Encore.getWebpackConfig()

config.optimization = {
  minimize: Encore.isProduction()
}

if (Encore.isDevServer()) {
  config.devtool = 'eval-source-map'
}

module.exports = config
