require('@babel/register')({
  extends: './babel.config.js',
  ignore: [/node_modules/],
  extensions: ['.js', '.ts'],
  cache: true
});
require('module-alias/register');

const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const GoogleFontsPlugin = require('google-fonts-plugin');

const VUE_VERSION = require('vue/package.json').version;
const VUE_LOADER_VERSION = require('vue-loader/package.json').version;

const MODE_DEVELOPMENT = 'development';
const MODE_PRODUCTION = 'production';
const MODE_TEST = 'test';

const ROOT = path.resolve(__dirname);
const DIST = path.resolve(ROOT, '..', 'bot', 'dist', 'site');

const CACHE_PATH = path.join(ROOT, 'tmp/cache');

const MODULE_SRC_PATH = path.join(ROOT, 'src');

module.exports = (env, args) => {
  process.env.NODE_ENV = env;

  let mode = env;
  if (mode === 'test') {
    mode = 'development';
  }

  // TODO
  if (mode === 'production') {
    //mode = 'development';
  }

  const isTest = env === MODE_TEST;
  const isDev = env === MODE_DEVELOPMENT;

  const PORT = 3000;
  const HOST = '0.0.0.0';

  const config = {
    target: 'web',
    context: MODULE_SRC_PATH,
    mode,
    //watch: isWatch,
    entry: {
      main: './main.ts',
      vendor: ['vue', 'vuex']
    },
    devServer: {
      host: HOST,
      contentBase: MODULE_SRC_PATH,
      port: PORT,
      hot: true,
      inline: true,
      compress: true,
      publicPath: '/',
      //open: true,
      stats: 'minimal',
      overlay: {
        warnings: true,
        errors: true
      }
    },
    stats: 'normal',
    externals: {
      uws: 'uws',
      'ursa-optional': 'ursa-optional',
      dns: 'dns',
      ursa: 'ursa',
      'le-challenge-ddns': 'le-challenge-ddns',
      'le-acme-core': 'le-acme-core',
      'buffer-v6-polyfill': 'buffer-v6-polyfill'
    },
    performance: {
      hints: false
    },
    output: {
      path: DIST,
      filename: isDev ? 'js/[name].bundle.js' : 'js/[name].[hash].bundle.js',
      sourceMapFilename: isDev ? 'js/[name].bundle.map' : 'js/[name].[chunkhash].bundle.map',
      chunkFilename: isDev ? 'js/[id].chunk.js' : 'js/[id].[chunkhash].chunk.js',
      publicPath: isDev ? '/' : './'
    },
    node: {
      //console: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: path.join(CACHE_PATH, 'babel-loader')
          },
          exclude: [/node_modules/]
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: 'babel-loader'
            },
            esModule: true,
            cacheDirectory: path.join(CACHE_PATH, 'vue-loader'),
            cacheIdentifier: [process.env.NODE_ENV || 'development', webpack.version, VUE_VERSION, VUE_LOADER_VERSION].join('|'),

            postcss: true
          }
        },
        {
          test: /\.svg$/,
          use: ['vue-svg-loader', 'svg-transform-loader', 'svgo-loader']
        },
        {
          test: /\.(sass|scss|css)/,
          use: [
            'style-loader',
            'vue-style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {sourceMap: false}
            }
          ]
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=1000&mimetype=application/font-woff&outputPath=fonts/&publicPath=fonts/'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.vue', '.ts', '.d.ts'],
      modules: [path.join(ROOT, 'node_modules'), 'node_modules'],
      alias: {
        site: path.resolve(ROOT, '/src'),
        vue: isDev || isTest ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.min.js',
        handlebars: 'handlebars/dist/handlebars.min.js'
        //'vue-types':process.env.NODE_ENV === 'production' ? 'vue-types/es/shim.js': 'vue-types/'
      }
    },

    plugins: [
      new GoogleFontsPlugin({
        formats: ['woff', 'woff2'], // eot, ttf, svg
        subsets: ['cyrillic-ext', 'cyrillic', 'latin'],
        fonts: [{family: 'Roboto Condensed', variants: ['300', '400', '700']}]
      }),
      new SpriteLoaderPlugin(),
      new webpack.EnvironmentPlugin(['NODE_ENV']), //, 'DEBUG'
      new CleanWebpackPlugin(),
      new DuplicatePackageCheckerPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: `!!html-loader!${path.join(MODULE_SRC_PATH, 'index.html')}`,
        filename: 'index.html',
        chunksSortMode: 'dependency',
        inject: 'body',
        hash: true,
        cache: true,
        minify: {
          removeComments: true,
          removeEmptyAttributes: true,
          collapseWhitespace: true
        }
      }),
      new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'async'})
    ]
  };

  if (isDev || isTest) {
    // config.devtool = 'eval';
    config.devtool = 'source-map';
    //config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
