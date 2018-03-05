Vue.component('family', {
  props: ['person'],
  template: '<p>{{ person.name }} {{ person.age + "岁" }}</p>'
})
var app = new Vue({
  el: '.ui.container',
  data: {
    tag: true,
    family: [
      { name: '陈实', age: 24 },
      { name: '徐露露', age: 25 },
      { name: ' 小陈实', age: 0.7 },
    ],
  },
  methods: {
    add() {
      this.family.push({
        name: 'test',
        age: 0
      })
    },
    rm() {
      this.family.pop();
    }
  }
})
