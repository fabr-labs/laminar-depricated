<template>
  <div class="booking-app">

    <h1>Booking Demo</h1>

    <button v-on:click="loadDates">Request Date</button>
   
  </div>
</template>

<script>

  // import { flowActions } from "../data-layer/bindings/vue-flow-actions-mixin.js"
  import { createUserFlow } from "../../../../src/user-flow/create-user-flow.js";
  import { vuexStoreMiddleware } from "../../../../src/user-flow/middleware/vuex-store/vuex-store-middleware.js";
  import vuex from "../../store.js";

  const middleware = [vuexStoreMiddleware(vuex)];
  const userFlow = createUserFlow({ middleware });

  import { loadDates } from "./flows/load-dates.flow.js";

  console.log(userFlow)

  export default {
    name: 'restaurant-booking-demo',
    // mixins: [flowActions],
    mounted() {
      
    },
    methods: {
      loadDates() {
        userFlow.pushFlow({  });  // flow: loadDates
      }
    }
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
