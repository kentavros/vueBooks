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
                  <input v-model="title" type="text" id="title" name="title" placeholder="" class="input-xlarge">
                  <p class="help-block">Input title book</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Price -->
              <label class="control-label"  for="price">Book Price</label>
              <div class="controls">
                  <input v-model="price" type="text" id="price" name="price" class="input-xlarge" placeholder="0.00">
                  <p class="help-block">Enter the price of the book - should be float or integer</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Description -->
              <label class="control-label"  for="description">Book Description</label>
              <div class="controls">
                <textarea v-model="description" type="text" id="description" name="description" class="input-xlarge"></textarea>
                  <p class="help-block">Enter the full description of the book</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Discount -->
              <label class="control-label"  for="discount">Book Discount</label>
              <div class="controls">
                  <input v-model="discount" type="text" id="discount" name="discount" class="input-xlarge" placeholder="">
                  <p class="help-block">Specify a discount for the book - should be float or integer</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Active -->
              <label class="control-label"  for="active">Book Status: Active / Deactive </label>
              <div class="controls">
                  <select v-model="active">
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
                  <input v-model="img" style="width: 209px;" type="text" id="img" name="img" placeholder="" class="input-xlarge">
                  <p class="help-block">Input image book. Default: static/img/no_image.jpg</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Button -->
              <div class="controls">
                  <button v-on:click="addBook()" class="btn btn-success">Create</button>
                  <router-link to='/admin'><button v-on:click="$parent.newBook=''" class="btn btn-info">Cancel</button></router-link>
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
          <legend class="title">Add Authors and Genres</legend>
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
                  <button v-on:click="saveBook()" class="btn btn-success">Save</button>
                  <router-link to='/admin'><button v-on:click="$parent.newBook=''" class="btn btn-info">Cancel</button></router-link>
                <p v-if="idBook != ''" class="alert-danger">{{errorMsg}}</p>
                
              </div>
              <div v-else class="controls">
                <router-link to='/admin'><button v-on:click="$parent.newBook=''" class="btn btn-info">Back</button></router-link>
                <p v-if="idBook != ''" class="alert-info">{{msg}}</p>  
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
      books: [],
      user: {},
      book: {},


      // idBook: '',
      // title: '',
      // price: '',
      // description: '',
      // discount: '0.00',
      // active: 'yes',
      // img: 'static/img/no_image.jpg',
      // authors: [],
      // genres: [],
      // user: [],
      // selGenres: [],
      // selAuthors: [],
      // btn: '',
      // strAuthors: '',
      // strGenres: ''
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
    }
    // saveBook: function(){
    //   var self = this
    //   self.msg = ''
    //   self.errorMsg = ''
    //   self.strAuthors = ''
    //   self.strGenres = ''
    //   if (self.selGenres.length == 0)
    //   {
    //     self.errorMsg = 'Forgot to choose Genre?'
    //   }
    //   if (self.selAuthors.length == 0)
    //   {
    //     self.errorMsg = 'Forgot to choose Author?'
    //   }
    //   self.selAuthors.forEach(function(idAuthor){
    //     // console.log(idAuthor)
    //     var data = new FormData()
    //     data.append('hash', self.user.hash)
    //     data.append('id_client', self.user.id)
    //     data.append('id_book', self.idBook)
    //     data.append('id_author', idAuthor)
    //     axios.post(getUrl() + 'booktoauthor/', data, axConf)
    //       .then(function (response) {
    //         if (response.data !== 1)
    //         {
    //             self.errorMsg = response.data
    //         }
    //       })
    //     .catch(function (error) {
    //     console.log(error)
    //     })
    //     self.authors.forEach(function(author){
    //       if (author.id == idAuthor)
    //       {
    //         self.strAuthors += author.name + ' '
    //       }
    //     })
    //   })
    //   self.selGenres.forEach(function(idGenre){
    //     // console.log(idGener)
    //     var data = new FormData()
    //     data.append('hash', self.user.hash)
    //     data.append('id_client', self.user.id)
    //     data.append('id_book', self.idBook)
    //     data.append('id_genre', idGenre)
    //     axios.post(getUrl() + 'booktogenre/', data, axConf)
    //       .then(function (response) {
    //         if (response.data !== 1)
    //         {
    //             self.errorMsg = response.data
    //         }
    //       })
    //     .catch(function (error) {
    //     console.log(error)
    //     })
    //     self.genres.forEach(function(genre){
    //       if (genre.id == idGenre)
    //       {
    //         self.strGenres += genre.name + ' '
    //       }
    //     })
    //   })
    //   if (self.errorMsg == '')
    //   {
    //     self.msg = 'Book, author(s) and gener(s) added to DB!'
    //     self.$parent.getBooks()
    //     self.btn = 1
    //     self.addToHistoryTable()
    //   }
    // },
    // addToHistoryTable: function(){
    //   var self = this
    //   var data = new FormData()
    //   data.append('hash', self.user.hash)
    //   data.append('id_client', self.user.id)
    //   data.append('title', self.title)
    //   data.append('genre', self.strGenres)
    //   data.append('author', self.strAuthors)
    //   data.append('price', self.price)
    //   axios.post(getUrl() + 'historybook/', data, axConf)
    //       .then(function (response) {
    //         if (response.data !== 1)
    //         {
    //             self.errorMsg = response.data
    //         }
    //       })
    //     .catch(function (error) {
    //     console.log(error)
    //     })
    // },
    // addBook: function(){
    //   var self = this
    //   self.msg = ''
    //   self.errorMsg = ''
    //   var data = new FormData()
    //   data.append('hash', self.user.hash)
    //   data.append('id_client', self.user.id)
    //   data.append('title', self.title)
    //   data.append('price', self.price)
    //   data.append('description', self.description)
    //   data.append('discount', self.discount)
    //   data.append('active', self.active)
    //   data.append('img', self.img)
    //   axios.post(getUrl() + 'books/', data, axConf)
    //         .then(function (response) {
    //         // console.log(response.data);
    //     if (response.data.id_book)
    //     {
    //       self.idBook = response.data.id_book
    //       self.msg = 'The book was created - add the author and genre!'
    //     }
    //     else
    //     {
    //       self.errorMsg = response.data
    //     }
    //     })
    //         .catch(function (error) {
    //         console.log(error)
    //     })
    // },
    // getUser: function(){
    //   var self = this
    //   if (localStorage['user']){
    //       self.user = JSON.parse(localStorage['user'])
    //   }
    //   else {
    //       self.$router.push('/')
    //   }
    // },
    // getAuthors: function(){
    //   var self = this 
    //   axios.get(getUrl() + 'authors/')
    //       .then(function (response) {
    //       // console.log(response.data)
    //       if (Array.isArray(response.data))
    //       {
    //         self.authors = response.data
    //       }
    //       else{
    //         self.errorMsg = response.data
    //       }
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
    // },
    // getGenres: function(){
    //   var self = this 
    //   axios.get(getUrl() + 'genres/')
    //       .then(function (response) {
    //       // console.log(response.data)
    //       if (Array.isArray(response.data))
    //       {
    //         self.genres = response.data
    //       }
    //       else{
    //         self.errorMsg = response.data
    //       }
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
    // },
    // getData: function(){
    //   var self = this
    //   self.getUser()
    //   self.getAuthors()
    //   self.getGenres()
    // } 
  },
  created(){
    this.getUser()
    this.getBooks()
  },
  computed: {
    selected(){
      var self = this
      console.log(self.selBook)
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
