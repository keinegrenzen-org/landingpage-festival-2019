module.exports = {
  parser: 'postcss-scss',
  plugins: {
    autoprefixer: {},
    'postcss-discard-comments': {},
    cssnano: {
      reduceIdents: false,
      zindex: false
    }
  }
}
