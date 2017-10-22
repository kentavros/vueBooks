<template>
  <div v-if="selBook" v-on="selected" class="editBook">
    <div class="reBook">
      <fieldset>
            <div id="legend">
              <legend class="title">Edit Book</legend>
            </div>
            <p v-if="errorMsg" class="alert-danger">{{errorMsg}}</p>
            <div class="control-group">
            <!-- Title -->
              <label class="control-label"  for="title">Book Title</label>
              <div class="controls">
                  <input v-model="book.title" type="text" id="title" name="title" placeholder="" class="input-xlarge">
                  <p class="help-block">Input title book</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Price -->
              <label class="control-label"  for="price">Book Price</label>
              <div class="controls">
                  <input v-model="book.price" type="text" id="price" name="price" class="input-xlarge" placeholder="0.00">
                  <p class="help-block">Enter the price of the book - should be float or integer</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Description -->
              <label class="control-label"  for="description">Book Description</label>
              <div class="controls">
                <textarea v-model="book.description" type="text" id="description" name="description" class="input-xlarge"></textarea>
                  <p class="help-block">Enter the full description of the book</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Discount -->
              <label class="control-label"  for="discount">Book Discount</label>
              <div class="controls">
                  <input v-model="book.discount" type="text" id="discount" name="discount" class="input-xlarge" placeholder="">
                  <p class="help-block">Specify a discount for the book - should be float or integer</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Active -->
              <label class="control-label"  for="active">Book Status: Active / Deactive </label>
              <div class="controls">
                  <select v-model="book.active">
                      <option value="yes">Active</option>
                      <option class="alert-danger" value="no">Deactive</option>
                  </select>
                  <p class="help-block">"Active" - displays a book / "Deactive" - does not display a book</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Image -->
              <label class="control-label"  for="img">Book Title</label>
              <div class="controls">
                  <input v-model="book.img" style="width: 209px;" type="text" id="img" name="img" placeholder="" class="input-xlarge">
                  <p class="help-block">Input image book. Default: static/img/no_image.jpg</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Button -->
              <div class="controls">
                  <button v-on:click="editBook()" class="btn btn-success">Edit</button>
                  <router-link to='/admin'><button v-on:click="$parent.selBook=''" class="btn btn-info">Cancel</button></router-link>
              </div>
            </div>
            <p class="alert-info">{{msg}}</p>
      </fieldset>
    </div>
    <br>

<!-- AUTHORS && GENRES Sections-->
    <div  class="AuthorGenre">
      <fieldset>
        <div id="legend">
          <legend class="title">Edit Authors and Genres</legend>
        </div>
            <div class="control-group">
            <!-- Author -->
              <label class="control-label"  for="author">Choose Book Author</label>
              <div class="controls">
                <select multiple v-model="selAuthors" class="author control-label" id="author">
                  <option v-for="author in authors" :value="author.id" >{{author.name}}</option>
                </select>
                  <p class="help-block">select Author - hold ctrl or shift to select more than one</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Genre -->
              <label class="control-label"  for="genre">Choose Book Genre</label>
              <div class="controls">
                <select multiple v-model="selGenres" class="genre control-label" id="genre">
                  <option v-for="genre in genres" :value="genre.id">{{genre.name}}</option>
                </select>
                  <p class="help-block">select Genre - hold ctrl or shift to select more than one</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Button -->
              <div v-if="btn == ''" class="controls">
                  <button v-on:click="editAuthorsGenres()" class="btn btn-success">Edit</button>
                  <router-link to='/admin'><button v-on:click="$parent.newBook=''" class="btn btn-info">Cancel</button></router-link>
                <p class="alert-danger">{{errorMsg}}</p>
                
              </div>
              <div v-else class="controls">
                <router-link to='/admin'><button v-on:click="$parent.selBook=''" class="btn btn-info">Back</button></router-link>
                <p class="alert-info">{{msgA}}</p>  
                <p class="alert-info">{{msgG}}</p>  
              </div>
            </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditBookFrom',
  props: ['selBook'],
  data () {
    return {
      errorMsg: '',
      msg: '',
      msgA: '',
      msgG: '',
      books: [],
      user: {},
      book: {},
      btn: '',
      authors: [],
      genres: [],
      selGenres: [],
      selAuthors: [],
      bookToAuthor: [],
      bookToGenre: [],
      strAuthors: '',
      strGenres: ''
    }
  },
  methods: {
    getUser: function(){
      var self = this
      if (localStorage['user']){
          self.user = JSON.parse(localStorage['user'])
      }
      else {
          self.$router.push('/')
      }
    },
    getBooks: function(){
      var self = this
      axios.get(getUrl() + 'books/hash/' + self.user.hash + '/id_client/' + self.user.id)
          .then(function (response) {
          // console.log(response.data)
          if (Array.isArray(response.data))
          {
            self.books = response.data
          }
          else{
            self.errorMsg = response.data
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    editBook: function(){
      var self = this
      self.msg = ''
      self.errorMsg = ''
      var data = {}
      data.hash = self.user.hash
      data.id_client = self.user.id //Admin id
      data.id = self.book.id
      data.title = self.book.title
      data.price = self.book.price
      data.description = self.book.description
      data.discount = self.book.discount
      data.active = self.book.active
      data.img = self.book.img
      axios.put(getUrl() + 'books/', data, axConf)
          .then(function (response) {
          console.log(response.data);
          if (response.data === 1)
          {
              self.msg = 'Book Edit Success'
              self.$parent.getBooks()
          }
          else
          {
              self.errorMsg = response.data
          }
      })
          .catch(function (error) {
          console.log(error)
      })
    },
    updateAuthors: function(selectAuth){
      var self = this
      selectAuth.forEach(function(idAuthor){
        var data = new FormData()
        data.append('hash', self.user.hash)
        data.append('id_client', self.user.id)
        data.append('id_book', self.book.id)
        data.append('id_author', idAuthor)
        axios.post(getUrl() + 'booktoauthor/', data, axConf)
          .then(function (response) {
            // console.log(response.data)
          if (response.data === 1)
          {
              self.msgA = 'Author(s) update'
          }
          else
          {
              self.errorMsg = response.data
          }
          })
        .catch(function (error) {
        console.log(error)
        })
      })
    },
    updateGenres: function(selectGenr){
      var self = this
      selectGenr.forEach(function(idGenre){
        // console.log(idGener)
        var data = new FormData()
        data.append('hash', self.user.hash)
        data.append('id_client', self.user.id)
        data.append('id_book', self.book.id)
        data.append('id_genre', idGenre)
        axios.post(getUrl() + 'booktogenre/', data, axConf)
          .then(function (response) {
            // console.log(response.data)
          if (response.data === 1)
          {
              self.msgG = 'Genre(s) update'
          }
          else
          {
              self.errorMsg = response.data
          }
          })
        .catch(function (error) {
        console.log(error)
        })
      })
    },
    editAuthorsGenres: function(){
      var self = this
      self.errorMsg = ''
      var selectAuth = self.selAuthors.slice()
      var selectGenr = self.selGenres.slice()
      //Authors edit
      axios.delete(getUrl() + 'booktoauthor/hash/' + self.user.hash + '/id_client/' +
      self.user.id + '/id/' + self.book.id, axConf)
          .then(function (response) {
          self.updateAuthors(selectAuth)
      })
      .catch(function (error) {
        console.log(error);
      })
      //Genres Edit
      axios.delete(getUrl() + 'booktogenre/hash/' + self.user.hash + '/id_client/' +
      self.user.id + '/id/' + self.book.id, axConf)
          .then(function (response) {
          self.updateGenres(selectGenr)
      })
      .catch(function (error) {
        console.log(error);
      })
      if (self.errorMsg == '')
      {
        self.btn = 1
      }
    },
    getAuthors: function(){
      var self = this 
      axios.get(getUrl() + 'authors/')
          .then(function (response) {
          // console.log(response.data)
          if (Array.isArray(response.data))
          {
            self.authors = response.data
          }
          else{
            self.errorMsg = response.data
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getGenres: function(){
      var self = this 
      axios.get(getUrl() + 'genres/')
          .then(function (response) {
          // console.log(response.data)
          if (Array.isArray(response.data))
          {
            self.genres = response.data
          }
          else{
            self.errorMsg = response.data
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getBookToAuthor: function(){
      var self = this
      self.selAuthors = []
      axios.get(getUrl() + 'booktoauthor/id_book/' + self.book.id)
          .then(function (response) {
          // console.log(response.data)
          if (Array.isArray(response.data))
          {
            self.bookToAuthor = response.data

            self.bookToAuthor.forEach(function(id){
              self.selAuthors.push(id.id_author)                
            })
            // console.log(self.selAuthors)
          }
          else{
            self.errorMsg = 'There is no author(s) in this book'
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getBookToGenre: function(){
      var self = this
      self.selGenres = []
      axios.get(getUrl() + 'booktogenre/id_book/' + self.book.id)
          .then(function (response) {
          // console.log(response.data)
          if (Array.isArray(response.data))
          {
            self.bookToGenre = response.data

            self.bookToGenre.forEach(function(id){
              self.selGenres.push(id.id_genre)                
            })
            // console.log(self.selGenres)
          }
          else{
            self.errorMsg = 'There is no genre(s) in this book'
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getData: function(){
      var self = this
      self.getUser()
      self.getBooks()
      self.getAuthors()
      self.getGenres()
    } 
  },
  created(){
    this.getData()
  },
  computed: {
    selected(){
      var self = this
      self.errorMsg = ''
      self.msg = ''
      self.msgA = ''
      self.msgG = ''
      self.btn = ''
      var selBook = self.selBook
      self.books.forEach(function(book){
        if (book.id == selBook)
        {
          self.book = book
          self.getBookToAuthor()
          self.getBookToGenre()
        }
      })
    }
  },
}
</script>


<style scoped>
.editBook{
    text-align: center; 
}
.reBook{
  margin: auto;
  color: darkblue;
  width: 550px;
  background-color: rgba(255, 255, 255, 0.7);
  padding-bottom: 10px;
}
.AuthorGenre{
  margin: auto;
  color: darkblue;
  width: 550px;
  background-color: rgba(255, 255, 255, 0.7);
  padding-bottom: 10px;
}
.author{
  width: 200px;
  height: 100px;
}
.genre{
  width: 200px;
  height: 100px;
}
</style>
