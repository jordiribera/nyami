module.exports = {
  pwa: {
    name: 'nyami',
    themeColor: '#70BC7D',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'no',
    appleMobileWebAppStatusBarStyle: 'default',
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',    
    manifestOptions:{
      start_url:'/'
    }
  }, 
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`,
      },
    },
  },
};
