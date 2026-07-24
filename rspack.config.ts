import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  entry: './src/index.tsx',
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  output: {
    // SCAFFOLD.md §10: must be 'auto', never a hardcoded absolute path — the
    // remote loads from the portal's page, so a fixed '/' would resolve
    // chunk URLs (including CSS Module chunks) against the portal's own
    // origin instead of this app's, 404ing everything but remoteEntry.js
    // itself. This app has a single route ("/"), so the nested-deep-link
    // concern that justifies hardcoding a prefix in some other apps doesn't
    // apply here.
    publicPath: 'auto',
    uniqueName: 'passGenApp',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript', tsx: true },
              transform: { react: { runtime: 'automatic', development: isDev } },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.module\.css$/,
        type: 'css/module',
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        type: 'css',
      },
    ],
    parser: {
      'css/module': { namedExports: false },
    },
    generator: {
      'css/module': { exportsConvention: 'camel-case-only' },
    },
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      name: 'passGenApp',
      filename: 'remoteEntry.js',
      exposes: {
        './PassGenWidget': './src/PassGenWidget.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react-router': { singleton: true, requiredVersion: '^7.0.0' },
      },
    }),
  ],
  devServer: {
    port: 3003,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
  },
});
