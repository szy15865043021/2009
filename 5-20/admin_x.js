

    //定义 根组件
    let App = {
    template: `
      <div>
        <header class="header">XX后台管理系统</header>

        <div class="main">
          <div class="content left">
            <ul>
              <li> <router-link to="/users">用户管理</router-link> </li>
              <li> <router-link to="/goods">商品管理</router-link></li>
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
}


    //定义一个用户管理组件
    let Users = {
        data(){
            return {
                list:[]
            }
        },
        created(){
            let api = "http://localhost:3001/user/list"
            axios.get(api).then(res=>{
                console.log(res.data)
                this.list = res.data
            })
        },
        template: `
        <div>
          <h3>用户管理</h3>   
          <router-view :key="Math.random()"></router-view>  
          <table>
          <thead>
          <tr><th>编号</th><th>姓名</th><th>Email</th><th>电话</th><th>操作</th></tr>
          </thead>
          <tbody>
          <tr v-for="(item,k) in list" :key="item.user_id">
            <td>{{ item.user_id }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.mobile }}</td>
            <td>
              <router-link :to="{path:'/user/info/'+k}">详情</router-link> |
              <a href="">删除</a> |
              <a href="">编辑</a>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
        `
    }

    //用户信息
    let UserInfo = {
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

        template:`
            <div>
                用户ID: <input type="text" :value="userinfo.user_id">
                用户名: <input type="text" :value="userinfo.user_name" >
                Email: <input type="text" :value="userinfo.email">   
                <button @click="updateUserInfo($route.params.index)">更新</button>
                <br><br>
            </div>
        `
    }

    //定义商品管理组件
    let Goods = {
        template: `<h2>商品管理组件</h2>`
    }


    //定义路由与组件的对应关系
    let routes = [
        {path:"/",redirect:"/users",component:App,children:[
            {path:"/users",component:Users,children:[
                {path:"/user/info/:index",component:UserInfo}
            ]},
            {path:"/goods",component:Goods},
        ]},

    ]

    //实例化 VueRouter
    let router = new VueRouter({
        routes
    })


    //实例化Vue
    new Vue({
    el: "#app",
    router:router
})