<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      url: {
        home:'http://bookshop1/user6/bookShop/client/api/',
        class: 'http://192.168.0.15/~user6/bookShop/client/api/'
      },
      location: 'class'
    }
  },
  computed: {
    getUrl: function(){
      var self = this
      if(self.location == 'home'){
        return self.url.home
      }
      else
      {
        return self.url.class
      }
    }
  }
}
</script>

<style>
#app {
  width: 1000px;
  margin: auto;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 30px; */
}
</style>
