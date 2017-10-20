<template>
  <div class="authorAdd">
    <div v-if="newAuthor" class="input">
      
      <div class="form-inline">
        <p class="title"><label >Input New Author:</label> </p>
        <input type="text" class="form-control" v-model="author">
        <button v-on:click="addAuthor()" class="btn btn-success" type="button">Submit</button>
      </div>
      <span v-show="msgInp != ''" class="alert-success" >{{msgInp}}</span>
      <span v-show="errorMsgInp != ''" class="alert-danger">{{errorMsgInp}}</span>
    </div>

    <div v-if="selAuthor" class="selected">
      <div class="form-inline">
        <p class="title"><label >Edit Or Delete Selected Author:</label> </p>
        <input type="text" class="form-control" v-model="editAuthor"  v-on="selected">
        <button  class="btn btn-success" type="button" v-on:click="edit(selAuthor)">Edit</button>
        <button  class="btn btn-danger" type="button" v-on:click="deleteFun(selAuthor)">Delete</button>
      </div>
      <span v-show="msgSel != ''" class="alert-success" >{{msgSel}}</span>
      <span v-show="errorMsgSel != ''" class="alert-danger">{{errorMsgSel}}</span>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'authorForm',
  props: ['newAuthor', 'selAuthor'],
  data () {
    return {
      errorMsgInp: '',
      errorMsgSel: '',
      msgInp: '',
      msgSel: '',
      user: {},
      author: '',
      editAuthor: '',
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
          self.msgInp = 'Author "' + self.author + '" successfully added'
          self.$parent.getAuthors()
          self.author = ''
        }
        else{
          self.errorMsgInp = response.data
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
      + self.user.id + '/id/' + self.selAuthor, axConf)
      .then(function (response) {
      console.log(response.data)
      if (response.data === 1)
      {
        self.msgSel = 'Author "' + self.editAuthor + '" has deleted!'
        self.$parent.getAuthors()
        self.editAuthor = ''
      }
      else{
          self.errorMsgSel = response.data
        }
     
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
              self.errorMsgInp = response.data
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
