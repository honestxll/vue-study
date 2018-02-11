var uiButton = {
  props: {
    text: {
      default: 'button',
      required: true,
      type: String,
      validator: function(value) {
        return value.length > 1;
      }
    }
  },
  template: '<button class="ui button">{{ text }}</button>'
};

var numButton = {
  template: '<button class="ui button" @click="increment">{{ count }}</button>',
  data: function() {
    return {
      count: 0,
    }
  },
  methods: {
    increment: function() {
      this.count++;
      this.$emit('add') // 点击组件的时候触发组件上监听的事件，来告诉爸爸数据发生了变化。
    }
  }
}

var segment = {
  // 想在组件里面放点内容，可以使用 slot 占位符
  template: '\
    <div class="ui stacked segment">\
      <slot>你好</slot>\
      <slot name="content">内容</slot>\
    </div>\
  '
}
var app = new Vue({
  el: '.ui.container',
  data: {
    tag: true,
    total: 0,
  },
  components: {
    uiButton: uiButton,
    numButton: numButton,
    segment: segment,
  },
  methods: {
    addTotal: function() {
      this.total++;
    }
  }
});
