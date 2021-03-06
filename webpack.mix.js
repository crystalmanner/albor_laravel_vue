const mix = require('laravel-mix')
const WebpackLaravelMixManifest = require('webpack-laravel-mix-manifest')
const isFunction = require('lodash/isFunction')
const Dotenv = require('dotenv-webpack')
const path = require('path')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const WebpackLaravelMixManifestConstructor = isFunction(WebpackLaravelMixManifest.default) ? WebpackLaravelMixManifest.default : WebpackLaravelMixManifest
mix.webpackConfig({
  plugins: [
    new Dotenv({
      path: './.env',
      silent: false
    }),
    new WebpackLaravelMixManifestConstructor()
  ],
  resolve: {
    /* Path Shortcuts */
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      /* root */
      '~': path.resolve(__dirname, 'resources/js'),
      sass: path.resolve(__dirname, 'resources/sass'),
      'fresh-bus': path.resolve(__dirname, 'vendor/freshinup/fresh-bus-forms/resources/assets/js'),
      'fresh-bus-sass': path.resolve(__dirname, 'vendor/freshinup/fresh-bus-forms/resources/sass')
    }
  },
  devServer: {
    disableHostCheck: true
  }
})
mix.options({
  vue: {
    esModule: true
  }
})
mix.js('resources/js/main.js', 'public/js', {
  includePaths: [
    path.resolve(__dirname, './node_modules/'),
    path.resolve(__dirname, './vendor/'),
    path.resolve(__dirname, './vendor/freshinup/fresh-bus-forms/node_modules/')
  ]
})
  .sass('resources/sass/app.scss', 'public/css', {
    includePaths: ['node_modules/', 'vendor/', 'vendor/freshinup/fresh-bus-forms/node_modules/']
  })
  .copyDirectory('node_modules/tinymce/skins', 'public/js/skins')
  .copyDirectory('resources/images', 'public/images')
  .copy('resources/favicon.ico', 'public/favicon.ico')

if (mix.inProduction()) {
  mix.version()
}
