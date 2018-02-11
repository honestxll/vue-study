var Home = {
  template: '<h1>首页</h1>'
};

var Event = {
  template: '\
    <div class="content">\
      <h1>活动</h1>\
      <router-link to="/event/1000">点我传递一个 1000 的 id</router-link>\
      <p>{{ $route.params.id }}</p>\
    </div>\
  '
};

var About = {
  props: ['name'],
  template: '\
    <div class="content">\
      <h1>关于</h1>\
      <router-link to="/about/陈实">接受参数的另一种方法</router-link>\
      <p>{{ name }}</p>\
    </div>\
  ',
  beforeRouteUpdate: function(to, from, next) {
    console.log(to, from);
    next();
  }
};

var Article = {
  template: '\
    <div>\
      <h1>文章</h1>\
      <router-link to="/article/comments">查看评论</router-link>\
      <router-view></router-view>\
    </div>\
  '
}

var Comments = {
  template: '\
    <div>\
      <div class="ui section divider"></div>\
      <ul class="ui list">\
        <li v-for="comment in comments">{{ comment.content }}</li>\
      </ul>\
    </div>\
  ',
  data: function () {
    return {
      comments: [
        { content: '不错' },
        { content: '嵌套路由使用方法' },
        { content: '要在路由中定义 children' },
      ]
    }
  }
}

var routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/event',
    alias: '/events', // 起别名，起了别名之后，两种名字都可以访问到
    component: Event,
  },
  // 基本操作
  {
    path: '/event/:id',
    component: Event,
  },
  {
    path: '/about',
    component: About,
  },
  // 用 props 传递数据
  {
    props: true,
    path: '/about/:name',
    component: About,
    // redirect: '/event', // 可以重定向到其他的路由
  },
  // 嵌套路由的使用
  {
    path: '/article',
    name: 'art', // 给路由起了名字之后，一旦我们在链接上动态的绑定了这个名字，那么即使我们修改了路由的 path 名称也没关系，我们只要知道路由的名字即可。
    component: Article,
    children: [
      {
        path: 'comments',
        component: Comments,
      }
    ]
  },
]

var router = new VueRouter({
  routes: routes,
})
var app = new Vue({
  el: '.ui.container',
  router: router,
});




/**************************************************
 路由里面还提供了很多方法让我们去使用
 更多的可以参考 https://router.vuejs.org/zh-cn/
 router.push('/')
 router.push('/', { params: { userId: 1 }})
 router.push({ name: 'art' })
**************************************************/
