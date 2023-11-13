/** @type {import("next").NextConfig} */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'api.dicebear.com',
      'xsgames.co',
      'd1lmgnqw69ga6t.cloudfront.net',
      'd3jm3hdd9b8409.cloudfront.net',
      'lh3.googleusercontent.com',
    ],
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },

  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },

  // disable console log in production

  /*plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(
                __dirname,
                './node_modules/pdfjs-dist/build/pdf.worker.min.js',
              ),
              to: path.join(__dirname, 'dist'),
            },
          ],
        }),
      ],
      entry: {
        main: './src/index.tsx',
        'pdf.worker': path.join(
          __dirname,
          './node_modules/pdfjs-dist/build/pdf.worker.min.js',
        ),
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
      },*/
};

module.exports = nextConfig;
