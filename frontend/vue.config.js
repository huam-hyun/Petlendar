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
        '/db': {
            target: 'http://localhost:3000'
        } 
      } 
    },
    outputDir: '../backend/public',
  }