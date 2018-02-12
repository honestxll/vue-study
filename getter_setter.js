const store = new Vuex.Store({
  state: {
    count: [0],
  },
  getters: {
    sum(state) {
      return state.count((a, b) => a + b);
    }
  }
})

const Counter = {
  props: ['num'],
  template: `
    <div class="ui red circular label">
      {{num}}
    </div>
  `
}

const app = new Vue({
  el: '.ui.container',
  component: {
    Counter,
  },
  template: `
    <div class="ui container">
      <Counter :num="store.state.count"></Counter>
    </div>
  `
})
