<template>
  <div class="adminArea">
    <h1>Admin Area, Hello {{user.firstName}}!</h1>
    
    <div class="row">
      <div class="titleA leftPanel col-md-3">
        <p class="nav"><router-link to='/'><button class="btn btn-default">To Main</button></router-link></p>
        <hr>
<!--AUTHORS-->        
        <div class="col-md-12">
          <button v-on:click="newAuthor=1" class="title btn btn-primary" type="button">New Author</button>
        <p>Edit Or Delete Author</p>
        <div class="form-group">
        <select class="form-control" v-model="selAuthor">
          <optgroup label="Authors">
            <option value="">Choose one of the following...</option>
            <option v-for="author in authors" :value="author.id" >{{author.name}}</option>
          </optgroup>
        </select>
          <div v-if="newAuthor || selAuthor" class="btnClear">
              <button class="btn-danger btn-xs" type="button" v-on:click="clear('author')" title="Clear author ssection">X</button>
          </div>
        </div>
        </div>
<!-- GENRE -->
        <div class="col-md-12">
          <button v-on:click="newGenre=1" class="title btn btn-primary" type="button">New Genre</button>
        <p>Edit Or Delete Genre</p>
        <div class="form-group">
        <select class="form-control" v-model="selGenre">
          <optgroup label="Genres">
            <option value="">Choose one of the following...</option>
            <option v-for="genre in genres" :value="genre.id">{{genre.name}}</option>
          </optgroup>
        </select>
          <div v-if="newGenre || selGenre" class="btnClear">
            <button class="btn-danger btn-xs" type="button" v-on:click="clear('genre')" title="Clear author ssection">X</button>
          </div>
        </div>
        </div>
<!--BOOKS-->
        <div class="col-md-12">
          <router-link to='/admin/newbook'><button v-on:click="newBook=1" class="title btn btn-warning" >New Book</button></router-link>
        <p>Edit Book</p>
        <div class="form-group">
        <select class="form-control" v-model="selBook">
          <optgroup label="Books">
            <option value="">Choose one of the following...</option>
            <option v-for="book in books" :value="book.id">{{book.title}}</option>
          </optgroup>
        </select>
          <div v-if="newBook || selBook" class="btnClear">
            <router-link to='/admin'>
              <button class="btn-danger btn-xs" type="button" v-on:click="clear('book')" title="Clear author ssection">X</button>
            </router-link>
          </div>
        </div>
        </div>
<!--USERS-->
        <div class="col-md-12">
          <router-link to='/admin/regist/'><button v-on:click="newUser=1" class="title btn btn-warning">New User</button></router-link>
        <p>Edit User</p>
        <div class="form-group">
        <select class="form-control" v-model="selUser">
          <optgroup label="Users">
            <option value="">Choose one of the following...</option>
            <option v-for="client in users" :value="client.id">{{client.first_name}}</option>
          </optgroup>
        </select>
          <div v-if="newUser || selUser" class="btnClear">
            <router-link to='/admin'>
              <button class="btn-danger btn-xs" type="button" v-on:click="clear('user')" title="Clear author ssection">X</button>
            </router-link>
          </div>
        </div>
        </div>

        <div class="col-md-12">
          <router-link to='/admin/orders/'><button class="titleOrder btn btn-info">Show all Orders</button></router-link>
        </div>
        <div class="navFoo">
             <p ><router-link to='/'><button class="btn btn-default">To Main</button></router-link></p>
        </div>
       
      </div>
      <div class="col-md-9">
        <h3 class="alert-danger" style="text-align:center">{{errorMsg}}</h3>
<!--AUTHOR VIEW SECTION-->
        <AuthorEditAdd :selAuthor="selAuthor" :newAuthor="newAuthor"></AuthorEditAdd>
<!--GENRE VIEW SECTION--> 
        <GenreEditAdd :selGenre="selGenre" :newGenre="newGenre"></GenreEditAdd>
<!--NEWBOOK--> <!--NEWUSERS--> <!--ORDERS-->
        <router-view></router-view>
<!--EDIT USER SECTION-->
        <AdminUserEditDel :selUser="selUser"></AdminUserEditDel>
<!--EDIT BOOK SECTION-->
        <AdminEditBook :selBook="selBook"></AdminEditBook>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AuthorEditAdd from './AuthorEditAdd'
import GenreEditAdd from './GenreEditAdd'
import AdminRegist from './AdminRegist'
import AdminUserEditDel from './AdminUserEditDel'
import NewBook from './NewBook'
import AdminEditBook from './AdminEditBook'
import AdminOrders from './AdminOrders'
export default {
  name: 'adminForm',
  data () {
    return {
      errorMsg: '',
      user: {},
      role: '',
      authors: [],
      genres: [],
      books: [],
      users: [],
      newAuthor: '',
      newGenre: '',
      newBook: '',
      newUser: '',
      selAuthor: '',
      selGenre: '',
      selBook:'',
      selUser: ''
    }
  },
  methods: {
    clear: function(str){
      var self = this
      if (str == 'author')
      {
        self.newAuthor = ''
        self.selAuthor= ''
        return true
      }
      else if (str == 'genre')
      {
        self.newGenre = ''
        self.selGenre = ''
      }
      else if (str == 'user')
      {
        self.newUser = ''
        self.selUser = ''
      }
      else if (str == 'book')
      {
        self.newBook = ''
        self.selBook = ''
      }
    },
    checkUserFun: function(){
        var self = this
        if (localStorage['user'])
        {
          self.user = JSON.parse(localStorage['user'])
          axios.get(getUrl() + 'clients/' + self.user.id)
              .then(function (response) {
                if (Array.isArray(response.data)){
                  if (self.user.hash === response.data[0].hash)
                  {
                    if (response.data[0].role == 'admin')
                    {
                      self.role = response.data[0].role
                    }
                    else{
                      self.$router.push('/')
                    }
                  }
                  else
                  {
                    self.$router.push('/')
                  }
                }
                else {
                  self.$router.push('/')
                }
              })
              .catch(function (error) {
                console.log(error)
              });
        }
        else{
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
    getUsers: function()
    {
      var self = this
      axios.get(getUrl() + 'clients/hash/' + self.user.hash + '/id_client/' + self.user.id)
          .then(function (response) {
          // console.log(response.data)
          if (Array.isArray(response.data))
          {
            self.users = response.data
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
      self.getAuthors()
      self.getGenres()
      self.getBooks()
      self.getUsers()
    }
  },
  created(){
    this.checkUserFun()
    this.getData()
  },
  components: {
    'AuthorEditAdd' : AuthorEditAdd,
    'GenreEditAdd' : GenreEditAdd,
    'AdminUserEditDel' : AdminUserEditDel,
    'AdminEditBook' : AdminEditBook
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adminArea h1{
  color: darkblue;
  text-align: center;
}
.leftPanel{
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: lavender;
}
.titleA{
  text-align: center;
}
.titleA p{
  margin-top: 10px;
  color: darkblue;
  font-size: 18px;
}
.titleA .col-md-12{
  margin-bottom: 10px;
}
.titleOrder{
  margin-bottom: 30px;
}
.nav{
  margin-bottom: 10px;
  text-align: left;
}
.btnClear{
  margin-top: 10px;
  float: right;
}
.navFoo{
  text-align: left;
}
</style>
