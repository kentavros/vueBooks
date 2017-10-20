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
    getUser: function(){
      var self = this
      if (localStorage['user']){
        self.user = JSON.parse(localStorage['user'])
      }
      else {
        self.$router.push('/')
      }
    },
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
