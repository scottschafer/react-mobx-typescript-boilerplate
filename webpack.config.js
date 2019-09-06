const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

const sourcePath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build_dist');

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
console.log('tsconfigPath = ' + tsconfigPath);

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      template: sourcePath + '/assets/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:4].css',
      chunkFilename: 'styles/[id].[contenthash:4].css'
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
      tslint: false,
      eslint: false,
      checkSyntacticErrors: true
    })
  ];

  if (isProd) {
    plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\/environments\/environment\.ts/, `${sourcePath}/environments/environment.prod.ts`
      ),
      new UglifyJsPlugin({
        sourceMap: true
      })
    );
  } else {
    plugins.push(new webpack.NamedModulesPlugin() /*, new webpack.HotModuleReplacementPlugin() */ );
  }

  const config = {
    resolve: {
      extensions: [
        '.webpack.js',
        '.web.js',
        '.js',
        '.ts',
        '.tsx'
      ],
      alias: {
        '@app': path.resolve(__dirname, 'src/app'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@src': path.resolve(__dirname, 'src')
      }
    },
    context: sourcePath,
    entry: {
      app: './main.tsx'
    },
    output: {
      path: distPath,
      filename: 'scripts/[name].bundle.[hash:4].js',
    },
    module: {
      rules: [{
          test: /\.(gif|png|jpe?g|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }, {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]'
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true
          }
        },
        {
          test: /\.css$/,
          use: [
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          // use: [
          //   'style-loader',
          //   'css-loader',
          //   'less-loader'
          // ]
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'resolve-url-loader',
              // not 100% sure if this is needed.
              options: {
                root: sourcePath + '/'
              }
            },
            'less-loader'
          ]
        },
        {
          // test: /\.ts$/,
          test: /\.ts|\.tsx$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src'),
          use: [{
            loader: 'ts-loader',
            options: {
              configFile: tsconfigPath,
              // disable type checker - we will use it in fork plugin
              transpileOnly: false,
            }
          }]
        }
      ],
    },
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devServer: {
      proxy: {
        // This is a bit of a hack to handle deep-linking/reloading of paths like '/editor/4'. We will serve up '/' in that case
        // because of historyApiFallback: true, but the static resources would be served from '/editor/styles/' etc if we didn't
        // fix them up.
        '/**': {
          secure: false,
          bypass: function (req, res, opt) {
            let result = req.path;
            const staticPaths = ['/styles/', '/scripts/', '/assets/'];
            staticPaths.forEach(staticPath => {
              const index = result.indexOf(staticPath);
              if (index !== -1) {
                result = result.substr(index);
              }
            });
            return result;
          }
        }
      },
      hot: true,
      inline: true,
      disableHostCheck: true,
      historyApiFallback: true,
      overlay: true,
      contentBase: distPath,
      port: 3000,
    }
  };

  if (!isProd) {
    console.log('using cheap-module-eval-source-map');
    config.devtool = 'cheap-module-eval-source-map'; // https://www.youtube.com/watch?v=Mi_ZUI6Q1kg
  }

  return config;
};