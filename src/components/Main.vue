<template>
  <div class="main">
      <p class="alert-danger">{{errMsg}}</p>
      
    <div class="row">
      <div class="col-md-3">
        //todo:: Login form
      </div>
      <div class="myHader col-md-9">
        <img src="static/img/book_head.jpg" style="width: 100%" />
        <span>Welcome to the book shope</span>
      </div>
    </div>
      
    <div class="row">
      <div class="sidebar col-md-3">
        <p>
          <button v-on:click="setFilterValues('', '')" class="btn btn-warning btn-block" type="button" >To Main</button>
        </p>
        <p>
        <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#booksList" aria-expanded="false" aria-controls="collapseExample">
          Books</button>
        </p>
        <div class="collapse" id="booksList">
            <ul v-for="book in books" class="nav nav-pills nav-stacked">
              <li ><a href="#" v-on:click="setFilterValues('book', book.id)">{{book.title}}</a></li>
            </ul>
        </div>

        <p>
        <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#authorsList" aria-expanded="false" aria-controls="collapseExample">
          Authors</button>
        </p>
        <div class="collapse" id="authorsList">
            <ul v-for="author in authors" class="nav nav-pills nav-stacked">
              <li ><a href="#" v-on:click="setFilterValues('author', author.id)">{{author.name}}</a></li>
            </ul>
        </div>

        <p>
        <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#genresList" aria-expanded="false" aria-controls="collapseExample">
          Genres</button>
        </p>
        <div class="collapse" id="genresList">
            <ul v-for="genre in genres" class="nav nav-pills nav-stacked">
              <li ><a href="#" v-on:click="setFilterValues('genre', genre.id)">{{genre.name}}</a></li>
            </ul>
        </div>

      </div>
      <div class="col-md-9">
        <div v-if="filteredBooks.length == 0" class="myWarning alert-warning">
          Nothing found
        </div>
          <div v-else>
            <div v-if="bookF.length == 0" v-for="book in filteredBooks" class="oneBook col-md-4">
              <!-- <p v-if="book.length == 0" class="alert-warning">Nothing found</p> -->
              <p class="title">{{book.title}}</p>
              <div class="image">
                <img :src="book.img" class="img"  />
              </div>
              <p class="price"><span>Price: </span>{{book.price}}$</p>
              <p v-if="book.discount > 0" class="discount"><span>Discount: </span>{{book.discount}}%</p>
              <p class="genre"><span>Genres: </span></p>
              <p v-for="genre in book.genres" class="genre">{{genre.name}}/ </p>
              <br>
              <p class="author"><span>Authors: </span></p>
              <p v-for="author in book.authors" class="author">{{author.name}}/ </p>
          </div>
          <div v-else>
            <div class="detailBook">
              <div class="row">
                <div class="col-md-5">
                  <p class="detailTitle">{{book.title}}</p>
                  <div class="image">
                    <img :src="book.img" class="img"  />
                  </div>
                </div>
                <div class="col-md-7">
                  <br>
                  <p>{{book.description}}</p>
                  <p v-if="book.discount > 0" class="discount"><span>Discount: </span>{{book.discount}}%</p>
                  <p class="genre"><span>Genres: </span></p>
                  <p v-for="genre in book.genres" class="genre">{{genre.name}}/ </p>
                  <br>
                  <p class="author"><span>Authors: </span></p>
                  <p v-for="author in book.authors" class="author">{{author.name}}/ </p>
                  <p class="price"><span>Price: </span>{{book.price}}$</p>
                </div>
              </div>
            </div>
          </div>
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
      books: [],
      authors: [],
      genres: [],
      filter: {
        name: '',
        id: ''
      },
      bookF: [],
      authorF: [],
      genreF: [],
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
    },
    setFilterValues: function(name, id){
      var self = this
      self.filter.name = name
      self.filter.id = id
      // console.log(self.filter)
    }
  },
  computed: {
    filteredBooks(){
      var self = this
      if (self.filter.name == '')
      {
        self.bookF = []
        return self.books
      }
      else if (self.filter.name == 'book')
      {
        // console.log(self.books)
        self.bookF = []
        self.authorF = []
        self.genreF = []
        self.books.forEach(function(book) {
          if (book.id === self.filter.id){
            self.bookF.push(book)
          }
        });
          return self.bookF
      }
      else if (self.filter.name == 'author'){
        self.bookF = []
        self.authorF = []
        self.genreF = []
        self.books.forEach(function(book){
          book.authors.forEach(function(author){
            if (author.id == self.filter.id)
            {
              self.authorF.push(book)
            }
          })
        })
        // console.log(self.authorF)
        return self.authorF
      }
      else if (self.filter.name == 'genre'){
        self.bookF = []
        self.authorF = []
        self.genreF = []
        self.books.forEach(function(book){
          book.genres.forEach(function(genre){
            if (genre.id == self.filter.id)
            {
              self.genreF.push(book)
            }
          })
        })
        return self.genreF
      }
    }
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
.genre span{
  font-weight: bold;
}
.author{
  display: inline;
}
.author span{
  font-weight: bold;
}
.discount span{
  font-weight: bold;
}
.price span{
  font-weight: bold;
}
.detailTitle{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: darkblue;
}
.myWarning{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 70px;
}
.myHader{
  height: 150px;
}
.myHader span{
  position:absolute;
  font-size: 55px;
  top: 20px;
  font-weight: 600;
  color: #4499e2;
  margin-left: 8px;
  margin-top: 5px;
}
</style>
