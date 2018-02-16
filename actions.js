/**************************************************
 Mutations 是用来修改数据用的，这些修改是同步的操作。
 有些需要异步做的事情，我们可以分配给 Action 去做。
 Action 可以 commit Mutation
 也就是 Action 执行完异步操作后，可以去提交一个修改
 在 Action 里，你可以得到 store 里面的属性还有方法
**************************************************/
const store = new Vuex.Store({
  state: {
    count: [0],
  },
  mutations: {
    // 给 count 数组添加数据
    push(state, payload) {
      this.state.count.push(payload);
    },
    // 异步回调设置值
    setCount(state, payload) {
      state.count = payload;
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
  actions: {
    getCount(context) {
      axios.get('http://localhost:8080/api/count')
        .then((response) => {
          context.commit('setCount', response.data.count)
        })
    }
  }
});

const mapGetters = Vuex.mapGetters;
const mapActions = Vuex.mapActions;

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
  },
  // 可以把 actions 放在 methods 里面，在生命周期里面用 this 直接调用
  // methods: {
  //   ...mapActions(['getCount'])
  // },
  mounted() {
    this.$store.dispatch('getCount');
    // this.getCount();
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
