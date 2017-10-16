<template>
  <div class="login navbar-form" >
    <div v-if="checkUser == ''">
        <div class="form-group">
            <input v-model="login" type="text" class="form-control" name="username" placeholder="Username">
        </div>
        <div class="form-group">
            <input v-model="pass" type="password" class="form-control" name="password" placeholder="Password">
        </div>
        <button v-on:click="loginFun()" type="submit" class="btn btn-primary">Sign In</button>
        <router-link class="regist" to="/registration">Registration</router-link>
        <span class="alert-danger">{{errorMsg}}</span>
    </div>
    
    <div v-else class="form-group">
      <p class="hello">Hello, <span>{{user.firstName}}</span>!</p>
      <p class="myOrders"><router-link class="reg" to="/orders"><button type="submit" class="btn btn-primary">My Orders</button></router-link></p>
      <p class="logout"><button v-on:click="logoutFun()" type="submit" class="btn btn-primary">Logout</button></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'loginForm',
  data () {
    return {
      login: '',
      pass: '',
      checkUser: '',
      errorMsg: '',
      user: {
        id: '',
        hash: '',
        firstName: '',
      },
      role: '',
      config: {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
      },
    }
  }, 
  methods: {
    loginFun: function(){
      var self = this
      self.errorMsg = ''
        if (self.login && self.pass)
        {
          axios.put(self.$parent.$parent.getUrl + 'clients/', {
            login: self.login,
            pass: self.pass
          }, self.config)
          .then(function (response) {
            if (response.data.id && response.data.hash)
            {
              self.user.id = response.data.id
              self.user.hash = response.data.hash 
              self.user.firstName = response.data.first_name
              self.role = response.data.role
              localStorage['user'] = JSON.stringify(self.user)
              self.checkUserFun()
              self.$parent.checkUserFun()
              if (self.role == 'admin')
              {
                self.$router.push('/admin')
              }
              return true
            }
            else {
              self.errorMsg = response.data
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        }
        else
        {
          self.errorMsg = 'Enter data in all fields!'
        }
    },
    checkUserFun: function(){
      var self = this
      if (localStorage['user'])
      {
        self.user = JSON.parse(localStorage['user'])
        axios.get(self.$parent.$parent.getUrl + 'clients/' + self.user.id)
            .then(function (response) {
              if (Array.isArray(response.data)){
                if (self.user.hash === response.data[0].hash)
                {
                    self.checkUser = 1;
                    self.role = response.data[0].role
                    return true
                }
                else
                {
                  self.checkUser = ''
                  delete localStorage['user']
                }
              }
              else {
                self.errorMsg = response.data
              }
            })
            .catch(function (error) {
              console.log(error)
            });
      }
      else{
        self.checkUser = ''
        return false
      }
    },
    logoutFun: function(){
      var self = this
      delete localStorage['user']
      self.checkUser = ''
      self.pass = ''
      self.$parent.checkUserFun()
    }
  },
  created(){
    this.checkUserFun()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  background-color: lavender;
  padding-top: 7px;
  padding-bottom: 8px;
  position: inherit;
  bottom: 7px;
}
.form-group{
  padding-bottom: 10px;
}
.regist{
  margin-left: 30px;
}
.hello {
  font-weight: bold;
  font-size: 18px;
  color: darkblue;
}

</style>
