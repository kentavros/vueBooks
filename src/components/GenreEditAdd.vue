<template>
  <div class="genreAdd">

    <div v-if="newGenre" class="input">
      <div class="form-inline">
        <p class="title"><label >Input New Genre:</label> </p>
        <input type="text" class="form-control" v-model="genre">
        <button v-on:click="addGenre()" class="btn btn-success" type="button">Submit</button>
      </div>
      <span v-show="msgInp != ''" class="alert-success" >{{msgInp}}</span>
      <span v-show="errorMsgInp != ''" class="alert-danger">{{errorMsgInp}}</span>
    </div>

    <div v-if="selGenre" class="selected">
      <div class="form-inline">
        <p class="title"><label >Edit Or Delete Selected Genre:</label> </p>
        <input type="text" class="form-control" v-model="editGenre"  v-on="selected">
        <button  class="btn btn-success" type="button" v-on:click="edit(selGenre)">Edit</button>
        <button  class="btn btn-danger" type="button" v-on:click="deleteFun(selGenre)">Delete</button>
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
  name: 'genreForm',
  props: ['newGenre', 'selGenre'],
  data () {
    return {
      msgInp: '',
      msgSel: '',
      errorMsgInp: '',
      errorMsgSel: '',
      genre: '',
      editGenre: '',
      user: {}
    }
  },
  methods:{
      addGenre: function(){
      var self = this
      self.msg = ''
      self.errorMsg = ''
      var data = new FormData()
      data.append('hash', self.user.hash)
      data.append('id_client', self.user.id)
      data.append('genre', self.genre)
      axios.post(getUrl() + 'genres/', data, axConf)
      .then(function (response) {
        // console.log(response.data)
        if (response.data === 1)
        {
          self.msgInp = 'Genre "' + self.genre + '" successfully added'
          self.$parent.getGenres()
          self.genre = ''
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
      var self = this
       axios.put(getUrl() + 'genres/', 
       {
         hash: self.user.hash,
         id_client: self.user.id,
         id: id,
         name: self.editGenre
       }, axConf)
            .then(function (response) {
              // console.log(response.data)
              if (response.data === 1)
              {
                self.msgSel = 'Edit genres to "' + self.editGenre + '".'
                self.$parent.getGenres()
                self.editGenre = ''
              }
              else {
                  self.errorMsgSel = response.data
              }
            })
            .catch(function (error) {
              console.log(error)
            })
    },
    deleteFun: function(id){
      var self = this
      axios.delete(getUrl() + 'genres/hash/' + self.user.hash + '/id_client/' 
      + self.user.id + '/id/' + self.selGenre, axConf)
      .then(function (response) {
      // console.log(response.data)
      if (response.data === 1)
      {
        self.msgSel = 'Genre "' + self.editGenre + '" has deleted!'
        self.$parent.getGenres()
        self.editGenre = ''
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
      var selGenre = self.selGenre
      if (selGenre != '')
      {
        axios.get(getUrl() + 'genres/' + selGenre)
            .then(function (response) {
            // console.log(response.data[0].name)
            if (Array.isArray(response.data))
            {
              self.editGenre = response.data[0].name
              return self.editGenre              
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
