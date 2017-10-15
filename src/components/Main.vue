<template>
  <div class="main">
      <p class="alert-danger">{{errMsg}}</p>
      {{msg}}
    <div class="row">
      <div class="col-md-4">
        //todo:: Login form
      </div>
    </div>
      
    <div class="row">
      <div class="sidebar col-md-3">
        <p>
        <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#booksList" aria-expanded="false" aria-controls="collapseExample">
          Books</button>
        </p>
        <div class="collapse" id="booksList">
            <ul v-for="book in books" class="nav nav-pills nav-stacked">
              <li ><a href="#">{{book.title}}</a></li>
            </ul>
        </div>

        <p>
        <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#authorsList" aria-expanded="false" aria-controls="collapseExample">
          Authors</button>
        </p>
        <div class="collapse" id="authorsList">
            <ul v-for="author in authors" class="nav nav-pills nav-stacked">
              <li ><a href="#">{{author.name}}</a></li>
            </ul>
        </div>

        <p>
        <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#genresList" aria-expanded="false" aria-controls="collapseExample">
          Genres</button>
        </p>
        <div class="collapse" id="genresList">
            <ul v-for="genre in genres" class="nav nav-pills nav-stacked">
              <li ><a href="#">{{genre.name}}</a></li>
            </ul>
        </div>

      </div>
      <div class="col-md-9">
        <div v-for="book in books" class="oneBook col-md-4">
          <p class="title">{{book.title}}</p>
          <div class="image">
            <img :src="book.img" class="img"  />
          </div>
          <p class="genre">Genres: </p>
          <p v-for="genre in book.genres" class="genre">{{genre.name}}/ </p>
          <br>
          <p class="author">Authors: </p>
          <p v-for="author in book.authors" class="author">{{author.name}}/ </p>
          <p>Discount: {{book.discount}}%</p>
          <p>Price: {{book.price}}$</p>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome Sanek! 8 days left, hurry!',
      books: [],
      authors: [],
      genres: [],
      errMsg: ''
    }
  },
  methods: {
    getBooks: function(){
      var self = this
          axios.get(self.$parent.getUrl + 'books/')
            .then(function (response) {
            // console.log(response.data)
            if (Array.isArray(response.data))
            {
              self.books = response.data
            }
            else{
              self.errMsg = response.data
            }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    getAuthors: function(){
      var self = this
      axios.get(self.$parent.getUrl + 'authors/')
            .then(function (response) {
            // console.log(response.data)
            if (Array.isArray(response.data))
            {
              self.authors = response.data
            }
            else{
              self.errMsg = response.data
            }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    getGenres: function(){
      var self = this
      axios.get(self.$parent.getUrl + 'genres/')
            .then(function (response) {
            // console.log(response.data)
            if (Array.isArray(response.data))
            {
              self.genres = response.data
            }
            else{
              self.errMsg = response.data
            }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  },
  computed: {
  },
  created(){
    this.getBooks()
    this.getAuthors()
    this.getGenres()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar{
    background-color: lavender;
    padding: inherit;
    padding-top: 10px;
}
.oneBook{
  text-align: center;
  width: 247px;
  height: 400px;
  overflow: hidden;
  margin-bottom: 15px;
}
.oneBook p{
  margin: 0 0 0px;
}
.title{
  font-size: 16px;
  font-weight: bold;
  color: darkblue;
}
.image{
 height: 260px;
}
.img{
  width: 100%
}
.genre {
  display: inline;
}
.author{
  display: inline;
}
</style>
