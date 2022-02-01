module.exports = {
  pwa: {
    name: 'vue-petinder',
    themeColor: '#7DE88C',
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
