Vue.component('family', {
  props: ['person'],
  template: '<div class="ui item">{{ person.name }} {{ person.age + "岁" }}</div>'
})
var app = new Vue({
  el: '.ui.container',
  data: {
    family: [
      { name: '陈实', age: 24 },
      { name: '徐露露', age: 25 },
      { name: ' 小陈实', age: 0.7 },
    ],
  },
})
