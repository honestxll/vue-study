/**************************************************
 之前我使用了在组件上动态绑定 getters 上的数据来监听值的变化
 事实上也可以给组件添加 computed 属性
 在 computed 中再返回对应的 getter 方法
 但是，这么做感觉给组件和 getters 写了两份一样的代码
 因为我们要定义三个 computed 和 三个 getter
 再在 computed 中调用对应的 getter
 Vuex 中也提供了一些不错的帮手函数，让我们可以简化这些操作
 下面就来改造一下之前的 demo
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

const mapGetters = Vuex.mapGetters;

// 计数器组件
const Counter = {
  props: ['num'],
  template: `
    <div>
      <div class="ui hidden divider"></div>
      <div class="ui red huge circular label">
        {{sum}}
      </div>
      <div class="ui divider"></div>
      一共 {{ total }} 个项目，平均数为 {{ average }}。
    </div>
  `,
  computed: {
    ...mapGetters(['sum', 'total', 'average'])
  }
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
      <Counter></Counter>
    </div>
  `,
});

// 这里我们可以动态的来改变 count
store.commit('push', 4);
