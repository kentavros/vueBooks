<template>
  <div class="authorAdd">
    <div v-if="newAuthor" class="input">
      
      <div class="form-inline">
        <p class="title"><label >Input New Author:</label> </p>
        <input type="text" class="form-control" v-model="author">
        <button v-on:click="addAuthor()" class="btn btn-success" type="button">Submit</button>
      </div>
      <span v-show="msg != ''" class="alert-success" >{{msg}}</span>
      <span v-show="errorMsg != ''" class="alert-danger">{{errorMsg}}</span>
    </div>

    <div v-if="selAuthor" class="selected">
      <div class="form-inline">
        <p class="title"><label >Edit Or Delete Selected Author:</label> </p>
        <input type="text" class="form-control" v-model="editAuthor"  v-on="selected">
        <button  class="btn btn-success" type="button" v-on:click="edit(selAuthor)">Edit</button>
        <button  class="btn btn-danger" type="button" v-on:click="deleteFun(selAuthor)">Delete</button>
      </div>
      <span v-show="msg != ''" class="alert-success" >{{msg}}</span>
      <span v-show="errorMsg != ''" class="alert-danger">{{errorMsg}}</span>
    </div>
    {{editAuthor}}
    <hr>
    {{selAuthor}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'authorForm',
  props: ['newAuthor', 'selAuthor'],
  data () {
    return {
      errorMsg: '',
      msg: '',
      user: {},
      author: '',
      editAuthor: '',
      idAuthor: '',
      nameAuthor: '',
    }
  },
  methods: {
    addAuthor: function(){
      var self = this
      self.msg = ''
      self.errorMsg = ''
      var data = new FormData()
      data.append('hash', self.user.hash)
      data.append('id_client', self.user.id)
      data.append('author', self.author)
      axios.post(getUrl() + 'authors/', data, axConf)
      .then(function (response) {
        // console.log(response.data)
        if (response.data === 1)
        {
          self.msg = 'Author successfully added'
          self.$parent.getAuthors()
        }
        else{
          self.errorMsg = response.data
        }
      })
      .catch(function (error) {
      console.log(error)
      })
    },
    getUser: function(){
      var self = this
      if (localStorage['user']){
        self.user = JSON.parse(localStorage['user'])
      }
      else {
        self.$router.push('/')
      }
    },
    edit: function(id){
      alert('edit ' + id)
    },
    deleteFun: function(id){
      var self = this
      axios.delete(getUrl() + 'authors/hash/' + self.user.hash + '/id_client/' 
      + self.user.id + '/' + self.selAuthor + '/', axConf)
      .then(function (response) {
      console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  },
  computed: {
    selected(){
      var self = this
      var selAuthor = self.selAuthor
      if (selAuthor != '')
      {
        axios.get(getUrl() + 'authors/' + selAuthor)
            .then(function (response) {
            // console.log(response.data[0].name)
            if (Array.isArray(response.data))
            {
              self.editAuthor = response.data[0].name
              return self.editAuthor              
            }
            else{
              self.errorMsg = response.data
            }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  },
  created(){
    this.getUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input{
  text-align: center;
  margin-bottom: 20px;
}
.selected{
  text-align: center;
  margin-bottom: 20px;
}
.title{
  font-size: 16px;
}
</style>
