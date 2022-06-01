module.exports = { 
    devServer: {
      proxy: { 
        '/api': { 
          target: 'http://localhost:3000',
          changeOrigin: true, 
          pathRewrite: { 
            '^/api': ''
          } 
        },
        '/user': {
            target: 'http://localhost:3000'
        },
        '/medical': {
          target: 'http://localhost:3000'
        },
        '/calendar': {
          target: 'http://localhost:3000'
        },
        '/pet': {
          target: 'http://localhost:3000'
        }
      },
    },
    outputDir: '../backend/public',
  }