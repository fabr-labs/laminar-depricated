// define a mixin object
export const flowActions = {
  created: function () {
  },
  methods: {
    flowAction: function (action) {
      console.log('hello from flow:action mixin!', action)
    }
  }
}