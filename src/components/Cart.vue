<template>
  <div class="cart">
      <div v-if="checkout == ''" class="cartForm">
        <legend class="title"><h2>Client Cart</h2></legend>          
        <p class="alert-danger">{{errorMsg}}</p>
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
            <button v-on:click="cartUpdate()" class="btn btn-info">Update</button>
            <button v-on:click="toCheckout()" class="btn btn-success">To Checkout</button>
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
      <div v-else-if="checkout == 1" class="cartForm">
        <legend class="title"><h2>Select a Payment Method</h2></legend>          
        <p class="alert-danger">{{errorMsg}}</p>
        <ul class="payment">
          <li v-for="payment in payments">
            <input type="radio" :value="payment.id" v-model="picked">
            <label>{{payment.name}}</label>
          </li>
        </ul>
      <button v-on:click="checkout=''" class="btn btn-warning">Back</button>
      <button v-on:click="Checkout()" class="btn btn-success">Checkout</button>
      </div>
      <div v-else-if="checkout == 2" class="cartForm">
        <legend class="title"><h2>Thank you, {{user.firstName}}!</h2></legend>
          <p class="info2">
            The collective of our shop is grateful to you for the trust you have placed!
            We will deliver the books you selected quickly and carefully!
          </p>
          <br>
          <router-link class="link" to='/'>Go to Main page</router-link>
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
      msg: '',
      checkout: '',
      clientDiscount: '',
      order: '',
      books: [],
      user: {},
      payments: [],
      picked: '',
      // config: {
      //   headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //       }
      // }
    }
  },
  methods: {
    getPayments: function(){
      var self = this
      axios.get(getUrl() + 'payment/')
        .then(function (response) {
          if (Array.isArray(response.data))
          {
            self.payments = response.data
          }
          else{
            self.errorMsg = response.data
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
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
      axios.get(getUrl() + 'cart/' + self.user.id)
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
            self.errorMsg = 'The cart is empty - go to the site and make your choice'
            self.books = []
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    getClientDiscount: function(){
      var self = this
      axios.get(getUrl() + 'clients/' + self.user.id)
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
    },
    cartUpdate: function(){
      var self = this
      if (self.books.length == 0)
      {
        self.errorMsg  = "The CART is EMPTY!"
        return false
      }
      else{
        var books = self.books.slice()
        books.unshift({'id_client' : self.user.id})
          axios.put(getUrl() + 'cart/', books, axConf)
            .then(function (response) {
              if (response.data == 'update')
              {
                self.getBooks()
                return true
              }
            })
            .catch(function (error) {
              console.log(error)
            });
      }

    },
    toCheckout: function(){
      var self = this
      self.cartUpdate()
      if (self.books.length == 0)
      {
        self.errorMsg  = "The CART is EMPTY!"
        return false
      }
      else
      {
        self.checkout = 1
        self.getPayments()
      }

    },
    Checkout: function(){
      var self = this
      if (self.books.length == 0)
      {
          // self.$router.push('/admin')
        self.errorMsg  = "The CART is EMPTY!"
        return false
      }
      self.errorMsg = ''
      if (!self.picked){
        return self.errorMsg = "Select a Payment Method!"
      }
      //add books to table orders
      var data = new FormData()
      data.append('id_client', self.user.id)
      data.append('discount_client', self.clientDiscount)
      data.append('id_payment', self.picked)
      data.append('total_discount', self.totalDiscount)
      data.append('total_price', self.getTotalPrice)
      axios.post(getUrl() + 'orders/', data, axConf)
      .then(function (response) {
        // console.log(response.data)
        if (response.data.id_order)
        {
          self.order = response.data.id_order
          self.addToFullOrder(self.order)
          self.cleanCart()
        }
        else{
          self.errorMsg = response.data
        }
      })
      .catch(function (error) {
      console.log(error)
      })
      
      self.checkout = 2
    },
    addToFullOrder: function(order){
      var self = this
      // add books to table orders_full_info
      self.books.forEach(function(book){
        var data = new FormData()
        data.append('id_order', order)
        data.append('id_book', book.id)
        data.append('title_book', book.title)
        data.append('count', book.count)
        data.append('price', book.price)
        data.append('discount_book', book.discount)
        axios.post(getUrl() + 'ordersfullinfo/', data, axConf)
        .then(function (response) {
          if (response.data !== 1)
          {
              self.errorMsg = response.data
          }
        })
        .catch(function (error) {
        console.log(error)
        })
      })
    },
    cleanCart: function()
    {
      var self = this
      axios.delete(self.$parent.getUrl + 'cart/' + self.user.id, self.config)
          .then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
  background-color: rgba(255, 255, 255, 0.8);
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
.info2{
  text-align: center;
  font-size: 17px;
  width: 500px;
}
.tbBook{
  font-size: 17px;
  text-align: center;
}
.inputCount{
  width: 25px;
}
.btnP{
  padding: 0;
}
.btnM{
  padding: 0;
  padding-left: 2px;
  padding-right: 2px;
}
.payment{
  list-style-type: none;
  padding: 0;
  width: 120px;
  text-align: left;
}
.link{
  font-size: 20px;
}
</style>
