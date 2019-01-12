<template>
  <div class="booking-app">

    <h1>Booking Demo</h1>

    <button v-on:click="flowAction('about')">Request Date</button>
   
  </div>
</template>

<script>

  // import { flowActions } from "../data-layer/bindings/vue-flow-actions-mixin.js"

  export default {
    name: 'restaurant-booking-demo',
    // mixins: [flowActions]
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

</style>
