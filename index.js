/**************************************************
 一开始的时候可能会难一些
 当网站是大型的 spa 应用的时候，vuex 就可以发挥它的作用
**************************************************/
'use strict';

const store = new Vuex.Store({
  // 把 vue 需要管理的数据放在这里
  state: {
    count: 0,
    num: 0,
  },
  // 我们只能通过 commit 的形式来改变数据 state
  mutations: { // 突变的意思
    increment(state) {
      state.count++;
    },
    add(state, payload) {
      state.num += payload;
    }
  }
})

const Counter = {
  // 这里的 count 就是调用了 computed 的 count 方法，得到了返回的值
  template: `
    <div class="ui red circular label" @click="add">
      {{ count }}
    </div>
  `,
  computed: {
    count() {
      // return store.state.count; // 如果没有在 Vue 注册 store，那么只能通过这种写法来调取数据
      return this.$store.state.count; // 如果注册了，那么在所有的子组件中都可以使用到
    }
  },
  /* 是不是会想到为什么不能直接这样用
  data() {
    return {
      count: this.$store.state.count
    }
  },
  其实我也不知道，官网就是这么使用的😄
  不过，一旦你使用了计算属性，Vue就会一直监听数据发生的变化来动态改变
  比如，下面的点击事件：
  */
  methods: {
    add() {
      this.$store.state.count++;
    }
  },
}

const app = new Vue({
  el: '.ui.container',
  store, // 全局注册，让所有的组件使用
  components: {
    // 这种写法是 es6 中对 对象的扩展 === Counter: Counter
    Counter,
  },
  template: `
    <div class="ui container">
      <div class="ui hidden divider"></div>
      <Counter></Counter>
    </div>
  `
})

// 每次我们都可以通过提交 commit 来改变数据
store.commit('increment');
store.commit('add', 2);
