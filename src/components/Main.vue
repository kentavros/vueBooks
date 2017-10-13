<template>
  <div class="main">
      {{msg}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome Sanek!',
      url: {
        home:'http://bookshop1/user6/bookShop/client/api/',
        class: 'http://192.168.0.15/~user6/bookShop/client/api/'
      },
      location: 'home', 
      books: []
    }
  },
  methods: {
    getAllBooks: function(){
      var self = this
          axios.get(self.requestUrl + 'books/')
            .then(function (response) {
            console.log(response.data)
            self.books = response.data
        })
        .catch(function (error) {
          console.log(error)
        });
    },
  },
  computed: {
      requestUrl(){
      var self = this
      if(self.location == 'home'){
        return self.url.home
      }
      else
      {
        return self.url.class
      }
    }
  },
  created(){
    this.getAllBooks()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
