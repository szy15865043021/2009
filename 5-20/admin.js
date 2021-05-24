// 定义div组件
let user={
    template:`<div>
              <header class="header">XX后台管理系统</header>
              <div class="main">
              <div class="content left">
              <ul>
              <li><router-link to="/users">用户管理</router-link></li>
              <li><router-link to="/goods">商品管理</router-link></li>
              <li>订单管理</li>
              </ul>
              </div>
              <div class="content right">
              <div class="main-content">
              <router-view></router-view>
              </div>
              </div>
              </div>
              <footer class="footer">版权信息</footer>
              </div>`
};
let users={
    data(){
        return{
            list:[]
        }
    },
    methods:{
      del(k){
        let uid=this.list[k].user_id
        axios.delete("http://localhost:3000/user/delete?uid="+uid).then(res=>{
          this.list.splice(k,1)
        })
      }
    },
    created(){
        let api="http://localhost:3000/users/list";
        axios.get(api).then(res=>{
            this.list=res.data;
        })
    },

    template:`<div>
            <!--<h3>用户管理</h3>   -->
            <router-view :key="Math.random()"></router-view>
            <table>
          <thead>
          <tr><th>编号</th><th>姓名</th><th>Email</th><th>电话</th><th>操作</th></tr>
          </thead>
          <tbody>
          <tr v-for="(item,k) in list" :key="item.user_id"> 
            <td>{{item.user_id}}</td>
            <td>{{item.user_name}}</td>
            <td>{{item.email}}</td>
            <td>{{item.mobile}}</td>
            <td>
              <router-link :to="{path:'/user/info/'+k}">详情</router-link> |
              <a href="" @click.prevent="del(k)">删除</a> |
              <a href="">编辑</a>
            </td>
          </tr>
          </tbody>
        </table>
        </div>`
};

//用户名详情组件
let UserInfo={
    data(){
    return {
        userinfo:null
    }
    },
    methods:{
      updateUserInfo(index){
        console.log(this.$parent.list)
        console.log(index)
      }
    },

    created(){
        console.log(this.$route.params.index)
        console.log(this.$parent.list)
        let index = this.$route.params.index
        this.userinfo = this.$parent.list[index]
        console.log("用户信息",this.userinfo)
    },
    template:`<div>
   编号：<input type="text" name="" :value="userinfo.user_id">
   用户名：<input type="text" name="" :value="userinfo.user_name">
   Email：<input type="text" name="" :value="userinfo.email">
   <!--电话：<input type="text" name="">-->
   <button @click="updateUserInfo($router.params.index)">更新</button>
   <br><br>
</div>`
};


//定义商品管理组件
let Goods={
    template:`<div>
            <h3>商品管理</h3>
            <table>
          <thead>
          <tr><th>编号</th><th>姓名</th><th>Email</th><th>电话</th><th>操作</th></tr>
          </thead>
          <tbody>
          <!--<tr v-for="item in list" :key="item.user_id"> -->
          <tr>
            <td>123</td>
            <td>zhangwu</td>
            <td>zhangwu@qq.ocm</td>
            <td>14725836912</td>
            <td>
              <a href="">详情</a> |
              <a href="">删除</a> |
              <a href="">编辑</a>
            </td>
          </tr>
          </tbody>
        </table>
        </div>`
};




// 定义路由
let routes=[
    {path:"/",redirect:"/users",component:user,children:[
            {path:"/users",component:users,children:[
                    {path:"/user/info/:index",component:UserInfo},
                ]},
            {path:"/goods",component:Goods}
        ]},
];

//实例化VueRouter
let  router=new VueRouter({
    routes:routes
});

new Vue({
    el:"#app",
    router:router,
});