/**************************************************
 这是一个 getter 的使用案例
 因为我们想在取数据的时候做一写加工
 下面我使用了同一个组件，但使用了不同的 getter 调取数据
 在通过 props 把数据传递给了组件
**************************************************/
const store = new Vuex.Store({
  state: {
    count: [0],
  },
  mutations: {
    // 给 count 数组添加数据
    push(state, payload) {
      this.state.count.push(payload);
    }
  },
  getters: {
    // 返回数组数字的总和
    sum(state) {
      return state.count.reduce((a, b) => a + b, 0);
    },
    // 返回数组的长度
    total(state) {
      return state.count.length;
    },
    // 返回数组的平均数
    average(state, getters) {
      return +(getters.sum / getters.total).toFixed(1);
    },
  },
});

// 计数器组件
const Counter = {
  props: ['num'],
  template: `
    <div class="ui red huge circular label">
      {{num}}
    </div>
  `,
};

// 添加数字的组件
const AddButton = {
  template: `
    <button class="ui button" @click="addNum">往数组中添加随机数</button>
  `,
  methods: {
    addNum() {
      let random = Math.floor(Math.random() * 10);
      this.$store.commit('push', random);
    }
  }
}

const app = new Vue({
  el: '.ui.container',
  store,
  components: {
    Counter,
    AddButton,
  },
  template: `
    <div class="ui container">
      <div class="ui hidden divider"></div>
      <AddButton></AddButton>
      <Counter :num="$store.getters.sum"></Counter>
      <Counter :num="$store.getters.total"></Counter>
      <Counter :num="$store.getters.average"></Counter>
    </div>
  `,
});

// 这里我们可以动态的来改变 count
store.commit('push', 4);
