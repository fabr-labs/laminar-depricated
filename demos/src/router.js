import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RestaurantBookingDemo from './views/RestaurantBookingDemo/RestaurantBookingDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/restaurant-booking-demo',
      name: 'restaurant-booking-demo',
      component: RestaurantBookingDemo
    }
  ]
})
