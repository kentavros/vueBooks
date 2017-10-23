<template>
  <div class="orders">
    {{orders}}
    <div>
      <router-link to='/admin'><button class="btn btn-info">Cancel</button></router-link>
    </div>
    <div class="sortBtn">
      <button class="btn-xs btn-primary" title="Up sort" type="button" v-on:click="sort('up')">&#8743;</button>
      <button class="btn-xs btn-primary" title="Down sort" type="button" v-on:click="sort('down')">&#8744;</button>
    </div>
    <div>
      <table class="table table-hover">
        <thead>
          <tr class="info">
            <th class="thTable">Number Order</th>
            <th class="thTable">Client Name</th>
            <th class="thTable">Client discount</th>
            <th class="thTable">Total discount</th>
            <th class="thTable">Total Price</th>
            <th class="thTable">Payment</th>
            <th class="thTable">Status</th>
            <th class="thTable">Date</th>
          </tr>
        </thead>
        <tbody  v-for="(order, index) in ordersFilter">
          <tr v-on:click="sel(index)" class="trOrders" href="" >
            <td>{{order.id_order}}</td>
            <td>{{order.client_name}}</td>
            <td>{{order.discount_client}}</td>
            <td>{{order.total_discount}}$</td>
            <td>{{order.total_price}}$</td>
            <td>{{order.pay_name}}</td>
            <td>{{order.status}}</td>
            <td>{{order.date_time}}</td>
          </tr>
          <tr v-if="order.selected == true">
            <td colspan="8">
              <table class="table table-hover table-condensed">
                    <thead>
                      <tr class="success">
                        <th class="thTable">#Order</th>
                        <th class="thTable">Book ID</th>
                        <th class="thTable">Title</th>
                        <th class="thTable">Count</th>
                        <th class="thTable">Price</th>
                        <th class="thTable">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr v-for="book in order.books">
                      <td>{{order.id_order}}</td>
                      <td>{{book.id_book}}</td>
                      <td>{{book.title_book}}</td>
                      <td>{{book.count}}</td>
                      <td>{{book.price}}$</td>
                      <td>{{book.discount_book}}$</td>
                    </tr>
                    </tbody>
                  </table>
              <button v-on:click="hide(index)" class="sortBtn btn-xs btn-primary" title="Hide orders">&#9650;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OrdersForm',
  data () {
    return {
      errorMsg: '',
      user: {},
      orders: [],
      refresh: false,
    }
  },
  methods:{
    sort: function(str){
      var self = this
      self.orders.sort(function(a,b){
        if (str != 'up'){
          return a.id_order - b.id_order
        }
        return b.id_order - a.id_order
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
    getOrders: function(){
      var self = this
      axios.get(getUrl() + 'orders/')
          .then(function (response) {
          // console.log(response.data)
          if (Array.isArray(response.data))
          {
            self.orders = response.data
            self.addSelected(self.orders)
          }
          else{
            self.errorMsg = response.data
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    addSelected: function(orders){
      var self = this
      orders.forEach(function(order){
        order.selected = false
      
      })
    },
    sel: function(index){
      var self = this
      // alert(index)
      if (!self.orders[index].selected){
        self.orders[index].selected = true
      }
      self.refresh = false
    },
    hide: function(index){
      var self = this
      if (self.orders[index].selected)
      {
        self.orders[index].selected = false
      }
      self.refresh = false
    }
  },
  computed:{
    ordersFilter(){
      var self = this
      var orders = self.orders
      if (!self.refresh)
      {
        self.refresh = true
      }
      return orders
    }
  },
  created(){
    this.getUser()
    this.getOrders()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table{
  text-align: center;
}
.trOrders{
  cursor: pointer;
}
.thTable{
  text-align: center;
}
.sortBtn{
  float: right;
  margin-bottom: 7px;
}
</style>
