<template>
    <div class="registration">
    <div class="regForm">
      <p class="alert-danger">{{errorMsg}}</p>
      
        <fieldset>
            <div id="legend">
            <legend class="title">Client Registration</legend>
            </div>
            <div class="control-group">
            <!-- firstName -->
            <label class="control-label"  for="firstName">First name</label>
            <div class="controls">
                <input v-model="firstName" type="text" id="firstName" name="firstName" placeholder="" class="input-xlarge">
                <p class="help-block">Input your real first name</p>
            </div>
            </div>
            <div class="control-group">
            <!-- lastName -->
            <label class="control-label"  for="lastName">Last name</label>
            <div class="controls">
                <input v-model="lastName" type="text" id="lastName" name="lastName" placeholder="" class="input-xlarge">
                <p class="help-block">Input your real last name</p>
            </div>
            </div>
            <div class="control-group">
            <!-- login -->
            <label class="control-label"  for="login">Login</label>
            <div class="controls">
                <input v-model="login" type="text" id="login" name="login" placeholder="" class="input-xlarge">
                <p class="help-block">Login can contain any letters or numbers, without spaces and latin letters </p>
            </div>
            </div>
        
            <div class="control-group">
            <!-- Password-->
            <label class="control-label" for="password">Password</label>
            <div class="controls">
                <input v-model="pass" type="password" id="password" name="password" placeholder="" class="input-xlarge">
                <p class="help-block">Password should be at least 4 characters</p>
            </div>
            </div>
        
            <div class="control-group">
            <!-- Password -->
            <label class="control-label"  for="password_confirm">Password (Confirm)</label>
            <div class="controls">
                <input v-model="passConf" type="password" id="password_confirm" name="password_confirm" placeholder="" class="input-xlarge">
                <p class="help-block">Please confirm password</p>
            </div>
            </div>
        
            <div class="control-group">
            <!-- Button -->
            <div class="controls">
                <button v-on:click="registration()" class="btn btn-success">Register</button>
                <router-link to='/admin'><button v-on:click="$parent.newUser=''" class="btn btn-info">Back</button></router-link>
            </div>
            </div>
        </fieldset>
    
    <div v-if="success === 'success'" class="success">
      <h4 class="alert alert-info">Client <strong>"{{fullName}}"</strong> Registered!</h4>
      <router-link class="link" to='/admin/regist/'><button v-on:click="success=''" class="btn btn-primary">Register more</button> </router-link>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminRegistrationForm',
  data () {
    return {
      firstName: '',
      lastName: '',
      login: '',
      pass: '',
      passConf: '',
      success: '',
      errorMsg: ''
    }
  },
  methods: {
      registration: function () {
          var self = this
          self.errorMsg = ''
          if (self.firstName && self.lastName && self.login && self.pass && self.passConf)
          {
              if (self.firstName.length <= 2)
              {
                  self.errorMsg = 'First name should be at least 3 characters'
                  return false
              }
              if (self.lastName.length <= 2)
              {
                  self.errorMsg = 'Last name should be at least 3 characters'
                  return false
              }
              if (self.pass.length <= 3)
              {
                  self.errorMsg = 'Password should be at least 4 characters'
                  return false
              }
              if(self.pass != self.passConf)
              {
                  self.errorMsg = 'Password fields do not match'
                  return false
              }
              var data = new FormData()
              data.append('first_name', self.firstName)
              data.append('last_name', self.lastName)
              data.append('login', self.login)
              data.append('pass', self.pass)
                axios.post(getUrl() + 'clients/', data, axConf)
                    .then(function (response) {
                    console.log(response.data);
                    if (response.data === 1)
                    {
                        self.success = 'success'
                    }
                    else
                    {
                        self.errorMsg = response.data
                    }
                })
                    .catch(function (error) {
                    console.log(error);
                });
          }
          else{
              self.errorMsg =  'Enter data in all fields!'
          }
      },

  },
  computed: {
    fullName(){
      return this.firstName + ' ' + this.lastName
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registration{
    text-align: center; 
}
.regForm{
  /* position: relative;
  top: 30px; */
  margin: auto;
  color: darkblue;
  width: 550px;
  background-color: rgba(255, 255, 255, 0.7);
  padding-bottom: 10px;
}
.title{
  color:darkcyan;
}
.help-block{
  color: black;
}
.success{
    color: darkblue;
    text-align: center;
}
.success h4{
  /* padding-top: 5px; */
}
.alert-danger{
    text-align: center
}

.link{
    font-size: 15px;
    font-weight: bold;
}
</style>
