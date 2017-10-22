<template>
  <div class="newBook">
    <div class="addBook">
      <fieldset>
            <div id="legend">
              <legend class="title">Add New Book</legend>
            </div>
            <p v-if="errorMsg" class="alert-danger">{{errorMsg}}</p>
            <div class="control-group">
            <!-- Title -->
              <label class="control-label"  for="title">Book Title</label>
              <div class="controls">
                  <input type="text" id="title" name="title" placeholder="" class="input-xlarge">
                  <p class="help-block">Input title book</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Price -->
              <label class="control-label"  for="price">Book Price</label>
              <div class="controls">
                  <input type="text" id="price" name="price" class="input-xlarge" placeholder="0.00">
                  <p class="help-block">Enter the price of the book - should be float or integer</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Description -->
              <label class="control-label"  for="description">Book Description</label>
              <div class="controls">
                <textarea type="text" id="description" name="description" class="input-xlarge"></textarea>
                  <p class="help-block">Enter the full description of the book</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Discount -->
              <label class="control-label"  for="discount">Book Discount</label>
              <div class="controls">
                  <input type="text" id="discount" name="discount" class="input-xlarge" placeholder="0.00">
                  <p class="help-block">Specify a discount for the book - should be float or integer</p>
              </div>
            </div>
            <div class="control-group">
            <!-- Active -->
              <label class="control-label"  for="active">Book Status: Active / Deactive </label>
              <div class="controls">
                  <select>
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
                  <input style="width: 209px;" type="text" id="img" name="img" placeholder="Default: static/img/no_image.jpg" class="input-xlarge">
                  <p class="help-block">Input title book</p>
              </div>
            </div> 
            <div class="control-group">
            <!-- Button -->
              <div class="controls">
                  <button class="btn btn-success">Create</button>
                  <router-link to='/admin'><button class="btn btn-info">Cancel</button></router-link>
              </div>
            </div>
      </fieldset>
    </div>
    <br>
    <div v-if="idBook" class="AuthorGenre">
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
              <div class="controls">
                  <button class="btn btn-success">Save</button>
                  <router-link to='/admin'><button class="btn btn-info">Cancel</button></router-link>
              </div>
            </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'newBookFrom',
  data () {
    return {
      errorMsg: '',
      idBook: '',
      user: [],
      authors: [],
      genres: [],
      selGenres: [],
      selAuthors: []
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
    getData: function(){
      var self = this
      self.getUser()
      self.getAuthors()
      self.getGenres()
    } 
  },
  created(){
    this.getData()
  },
}
</script>


<style scoped>
.newBook{
    text-align: center; 
}
.addBook{
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
