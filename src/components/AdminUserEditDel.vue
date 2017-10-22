<template>
    <div v-if="selUser" v-on="selected" class="editDel" >
    <div class="regForm">
      <p class="alert-danger">{{errorMsg}}</p>
      
        <fieldset v-for="cli in client">
            <div id="legend">
            <legend class="title">Edit Client Information</legend>
            </div>
            <div class="control-group">
            <!-- login -->
            <label class="control-label"  for="login">Login</label>
            <div class="controls">
                <input v-model="cli.login" style="text-align: center" type="text" id="login" name="login" placeholder="" class="input-xlarge" disabled>
                <p class=""></p>
            </div>
            </div>
            <div class="control-group">
            <!-- firstName -->
            <label class="control-label"  for="firstName">First name</label>
            <div class="controls">
                <input v-model="cli.first_name" type="text" id="firstName" name="firstName" class="input-xlarge">
                <p class="help-block">Input your real first name</p>
            </div>
            </div>
            <div class="control-group">
            <!-- lastName -->
            <label class="control-label"  for="lastName">Last name</label>
            <div class="controls">
                <input v-model="cli.last_name" type="text" id="lastName" name="lastName" placeholder="" class="input-xlarge">
                <p class="help-block">Input your real last name</p>
            </div>
            </div>
            <div class="control-group">
            <!-- Discount -->
            <label class="control-label"  for="discount">Discount</label>
            <div class="controls">
                <input v-model="cli.discount" type="text" id="discount" name="discount" class="input-xlarge" >
                <p class="help-block">Specify the discount amount for the customer</p>
            </div>
            </div>
            <div class="control-group">
            <!-- Role -->
            <label class="control-label"  for="role">Role</label>
            <div class="controls">
                <select v-model="cli.role">
                    <option value="user">User</option>
                    <option class="alert-danger" value="admin">Admin</option>
                </select>
                <p class="help-block">Specify the role of the user you are creating: "user" or "admin"</p>
            </div>
            </div>

            <div class="control-group">
            <!-- Active -->
            <label class="control-label"  for="role">Status: Active / Deactive </label>
            <div class="controls">
                <select v-model="cli.active">
                    <option value="yes">Active</option>
                    <option class="alert-danger" value="no">Deactive</option>
                </select>
                <p class="help-block"></p>
            </div>
            </div>
            <div class="control-group">
            <!-- Password-->
            <label class="control-label" for="password">Password</label>
            <div class="controls">
                <input v-model="pass" type="password" id="password" name="password" placeholder="You can leave it blank!" class="input-xlarge">
                <p class="help-block">You can leave it blank! If necessary, change the password - Password should be at least 4 characters</p>
            </div>
            </div>
        
            <div class="control-group">
            <!-- Password -->
            <label class="control-label"  for="password_confirm">Password (Confirm)</label>
            <div class="controls">
                <input v-model="passConf" type="password" id="password_confirm" name="password_confirm" placeholder="You can leave it blank!" class="input-xlarge">
                <p class="help-block">Please confirm password - Password should be at least 4 characters</p>
            </div>
            </div>
        
            <div class="control-group">
            <!-- Button -->
            <div class="controls">
                <button v-on:click="editClient()" class="btn btn-success">Edit Client</button>
                <router-link to='/admin'><button v-on:click="$parent.selUser=''" class="btn btn-info">Cancel</button></router-link>
            </div>
            </div>
        </fieldset>
    
    <div v-if="success === 'success'" class="success">
      <h4 class="alert alert-info">Client <strong>"{{fullName}}"</strong> edit success!</h4>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminUserEditDelForm',
  props: ['selUser'],
  data () {
    return {
        user: [],
        client: [],
        pass: '',
        passConf: '',
        success: '',
        errorMsg: ''
    }
  },
  methods: {
      editClient: function () {
          var self = this
          self.errorMsg = ''
          self.success = ''
          if (self.client[0].first_name && self.client[0].last_name)
          {
              if (self.client[0].first_name.length <= 2)
              {
                  self.errorMsg = 'First name should be at least 3 characters'
                  return false
              }
              if (self.client[0].last_name.length <= 2)
              {
                  self.errorMsg = 'Last name should be at least 3 characters'
                  return false
              }

              var data = {}
              data.hash = self.user.hash
              data.id_client = self.user.id //Admin id
              data.id = self.client[0].id
              data.first_name = self.client[0].first_name
              data.last_name = self.client[0].last_name
              data.discount = self.client[0].discount
              data.role = self.client[0].role
              data.active = self.client[0].active
                if (self.pass != '')
                {
                    if (self.pass.length <= 3)
                    {
                        self.errorMsg = 'Password should be at least 4 characters'
                        return false
                    }
                    else if(self.pass != self.passConf)
                    {
                        self.errorMsg = 'Password fields do not match'
                        return false
                    }
                    else
                    {
                        data.pass = self.pass
                    }
                }
                axios.put(getUrl() + 'clients/', data, axConf)
                    .then(function (response) {
                    console.log(response.data);
                    if (response.data === 1)
                    {
                        self.success = 'success'
                        self.$parent.getUsers()
                    }
                    else
                    {
                        self.errorMsg = response.data
                        self.$parent.getUsers()
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
        self.pass = ''
        self.passConf = ''
        self.errorMsg = ''
        self.success = ''
        var selUser = self.selUser
        if (selUser != '')
        {
            axios.get(getUrl() + 'clients/hash/' + self.user.hash + 
            '/id_client/' + self.user.id +
            '/id/' + selUser)
                .then(function (response) {
                // console.log(response.data)
                if (Array.isArray(response.data))
                {
                    self.client = response.data
                }
                else{
                    self.errorMsg = response.data
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    fullName(){
    return this.client[0].first_name + ' ' + this.client[0].last_name
    }
  },
  created(){
    this.getUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editDel{
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
