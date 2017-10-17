<template>
  <div class="cart">
      <div class="cartForm">
        <legend class="title"><h2>Client Cart</h2></legend>          
        <p class="alert-danger">{{errorMsg}}</p>
          <p v-if="books.length == 0" class="alert-danger">The cart is empty - go to the site and make your choice</p>
        <table class="table table-hover ">
          <thead>
            <tr class="info">
              <th>Add</th>
              <th>Name</th>
              <th>Count</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>
            
            <tr v-for="(book, index) in books" class="tbBook">
              <td>
                <input type="checkbox" id="checkbox" v-model="books[index].checked">
              </td>
              <td>{{book.title}}</td>
              <td>
                <button v-on:click="getCount('+', index)" type="submit" class="btnP">+</button>
                <input class="inputCount" type="text" v-model="books[index].count" />
                <button v-on:click="getCount('-', index)" type="submit" class="btnM">-</button>
              </td>
              <td>{{book.price}}$</td>
              <td>{{book.discount}}%</td>
              <td>{{sumPrice(index)}}$</td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <div class="col-md-6">
            <router-link to='/'><button class="btn btn-warning">Back</button></router-link>
            <button v-on:click="getTotalPrice()" class="btn btn-info">Update</button>
            <button v-on:click="2" class="btn btn-success">To Checkout</button>
          </div>
          <div class="col-md-6">
            <div class="total">
              Client Discount: {{clientDiscount}}%
            </div>
            <div class="total">
              Total discount: -{{totalDiscount}}$
            </div>
            <div class="total">
              Total price: {{getTotalPrice}}$
            </div>
          </div>

        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'cartForm',
  data () {
    return {
      errorMsg: '',
      // total: 0.00,
      clientDiscount: '',
      // totalDiscount: '',
      books: [],
      user: {}
    }
  },
  methods: {
    getCount: function(sym, index){
      var self =this
        if (sym == '+')
        {
          self.books[index].count = +self.books[index].count + 1
        }
        else if (sym == '-')
        {
          self.books[index].count -= 1
          if (self.books[index].count < 1)
          {
            self.books[index].count = 1
          }
        }
    },
    getBooks: function(){
      var self = this
      axios.get(self.$parent.getUrl + 'cart/' + self.user.id)
        .then(function (response) {
          if (Array.isArray(response.data))
          {
            self.books = response.data
            self.books.forEach(function(book) {
              book.checked = true
            })
            // console.log(self.books)
          }
          else{
            self.errorMsg = response.data
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    getClientDiscount: function(){
      var self = this
      axios.get(self.$parent.getUrl + 'clients/' + self.user.id)
      .then(function (response) {
        if (Array.isArray(response.data)){
          if (self.user.hash === response.data[0].hash)
          {
              self.clientDiscount = response.data[0].discount
              // console.log(self.clientDiscount)
              return true
          }
          else
          {
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
    },
    getUser: function(){
      var self = this
      if (localStorage['user']){
        self.user = JSON.parse(localStorage['user'])
        self.getClientDiscount()
      }
      else {
        self.$router.push('/')
      }
    },
    sumPrice: function(index){
      var self = this
      var discount = (+self.books[index].price * +self.books[index].discount)/100
      self.books[index].sum = (+self.books[index].price - discount) * +self.books[index].count
      // self.getTotalPrice()
      return self.books[index].sum.toFixed(2)
    }

  },
  created(){
    this.getUser()
    this.getBooks()
  },
  computed: {
    getTotalPrice(){
      var self = this
      var books = self.books
      var total = 0
      books.forEach(function(book){
      var discount = (+book.price * +book.discount)/100
        total += +(+book.price - discount) * +book.count
        // console.log(book)
      })
      var cliDisc = (+total * +self.clientDiscount)/100
      total = +total - cliDisc
      total = total.toFixed(2)
      return total
    },
    totalDiscount(){
      var self = this
      var books = self.books
      var total = self.getTotalPrice
      var totalWithout = 0;
      books.forEach(function(book){
        totalWithout += +book.price * +book.count
      })
      var discount = +totalWithout - +total
      return discount.toFixed(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart{
  background-image: url(/static/img/book_cart.jpg);
  height: 1500px;
  text-align: -webkit-center;
}
.cartForm{
  position: relative;
  top: 30px;
  color: darkblue;
  width: 700px;
  background-color: rgba(255, 255, 255, 0.7);
  padding-bottom: 10px;
}
.total{
  text-align: left;
  font-size: 17px;
}
.check{
  text-align: center;
}
.info th{
  text-align: center;
  font-size: 17px;
}
.tbBook{
  font-size: 17px;
  text-align: center;
}
.inputCount{
  width: 20px;
}
.btnP{
  padding: 0;
}
.btnM{
  padding: 0;
  padding-left: 2px;
  padding-right: 2px;
}
</style>
