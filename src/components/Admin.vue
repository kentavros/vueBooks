<template>
  <div class="adminArea">
    <h1>Admin Area, Hello {{user.firstName}}!</h1>

    <div class="row">
      <div class="titleA leftPanel col-md-3">
        <p class="nav"><router-link to='/'><button class="btn btn-default">To Main</button></router-link></p>
        
        <div class="col-md-12">
          <router-link to=''><button class="title btn btn-primary">New Author</button></router-link>
        <p>Edit Or Delete Author</p>
        <div class="form-group">
        <select class="form-control">
          <optgroup label="Authors">
            <option>Choose one of the following...</option>
          </optgroup>
        </select>
        </div>
        </div>

        <div class="col-md-12">
          <router-link to=''><button class="title btn btn-primary">New Genre</button></router-link>
        <p>Edit Or Delete Genre</p>
        <div class="form-group">
        <select class="form-control">
          <optgroup label="Genres">
            <option>Choose one of the following...</option>
          </optgroup>
        </select>
        </div>
        </div>

        <div class="col-md-12">
          <router-link to=''><button class="title btn btn-warning">New Book</button></router-link>
        <p>Edit Or Delete Book</p>
        <div class="form-group">
        <select class="form-control">
          <optgroup label="Books">
            <option>Choose one of the following...</option>
          </optgroup>
        </select>
        </div>
        </div>

        <div class="col-md-12">
          <router-link to=''><button class="title btn btn-warning">New User</button></router-link>
        <p>Edit User</p>
        <div class="form-group">
        <select class="form-control">
          <optgroup label="Users">
            <option>Choose one of the following...</option>
          </optgroup>
        </select>
        </div>
        </div>

        <div class="col-md-12">
          <router-link to=''><button class="title btn btn-info">Show all Orders</button></router-link>
        </div>
        <p class="nav"><router-link to='/'><button class="btn btn-default">To Main</button></router-link></p>
      </div>
      <div class="col-md-9">
        
        4884
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'adminForm',
  data () {
    return {
      msg: 'Hello Admin',
      user: {},
      role: '',
    }
  },
  methods: {
      checkUserFun: function(){
        var self = this
        if (localStorage['user'])
        {
          self.user = JSON.parse(localStorage['user'])
          axios.get(self.$parent.getUrl + 'clients/' + self.user.id)
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
    }
  },
  created(){
    this.checkUserFun()
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
  margin-bottom: 30px;
}
.nav{
  margin-bottom: 30px;
  text-align: left;
}
</style>
