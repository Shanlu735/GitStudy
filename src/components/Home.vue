<template>
     <el-container class="home-container">
        
<!-- 头部区域 -->
    <el-header>
        <div>
            <img src="" alt="">
            <span>BIM桥梁监测后台管理系统</span>
        </div> 
   <el-button type="info" @click="logout">退出</el-button>  
   </el-header>
   <!-- 主题区域 -->
        <el-container>
        <!-- 侧边区域 -->
          <el-aside :width="isCollapse ? '64px' : '200px'">
              <div class="toggle-button" @click="toggleCollapse">|||</div>
              <!-- 侧边栏菜单区域 -->
              <!-- 开启路由模式 -->
    <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse"
    :collapse-transition="false" :router="true">
       <!-- 一级菜单
      <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
         一级菜单的模板区域
        <template slot="title">
            图标 
          <i :class="iconsObj[item.id]"></i>
          文本 
          <span></span>
        </template>

       二级菜单 
        
          <el-menu-item :index="subItem.id" v-for="subItem in item.children"
          :key="subItem.id">
              <template slot="title">
            图标 
          <i class="el-icon-menu"></i>
          <span>{{subItem.authName}}</span>
           </template>
          </el-menu-item> -->
          <!-- 左侧栏 -->
          <!-- 用户管理 -->
           <el-submenu index="1">
        <template slot="title">
      <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="user">用户列表</el-menu-item>
          <el-menu-item index="information">用户信息</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
     <!-- 实时检测大屏 -->
   <el-submenu index="2">
        <template slot="title">
      <i class="el-icon-menu"></i>
          <span>大屏展示</span>
        </template>
        <el-menu-item-group>
         
        </el-menu-item-group>
        
      </el-submenu>
        <!-- 配置管理-->
        <el-submenu index="3">
        <template slot="title">
      <i class="el-icon-menu"></i>
          <span>配置管理</span>
        </template>
        <el-menu-item-group>
            
          <el-menu-item index="3-1"> 
              <i class="el-icon-menu"></i>
          <span>检测项管理</span>
        
        </el-menu-item>
          <el-menu-item index="3-2">报警信息管理</el-menu-item>
         <el-menu-item index="3-3">报警级别管理</el-menu-item>
         
        </el-menu-item-group>
        
      </el-submenu>
      <!-- 结构检测模块-->
        <el-submenu index="4">
        <template slot="title">
      <i class="el-icon-menu"></i>
          <span>结构检测</span>
        </template>
        <el-menu-item-group>
            
          <el-menu-item index="4-1">平面布置</el-menu-item>
          <el-menu-item index="4-2">数据展示</el-menu-item>
         <el-menu-item index="4-3">报警一栏</el-menu-item>
          <el-menu-item index="4-4">报警历史查询</el-menu-item>
          <el-menu-item index="4-5">数据分析</el-menu-item>
         <el-menu-item index="4-6">报告管理</el-menu-item>
         <el-menu-item index="4-7">视频设备</el-menu-item>
       
          <el-submenu index="4-8">
          <template slot="title">统计分析</template>
          <el-menu-item index="4-8-1">选项1</el-menu-item>
          </el-submenu>
        
           <el-menu-item index="4-9">自动报表</el-menu-item>
         
        </el-menu-item-group>
        
      </el-submenu>
   
    </el-menu>
          </el-aside>
          <!-- 右侧栏 -->
          
           <el-main>
               <!-- 路由占位符 -->
               <router-view>
               </router-view>
           </el-main>
        </el-container>
     </el-container>
    
</template>

<script>
export default {
    data(){
        return{
            menulist:[],
            iconsObj: {
                '125':'el-icon-s-goods',
                '103':'el-icon-user-solid',
                '101':'el-icon-star-on',
                '102':'el-icon-s-cooperation',
                '145':'el-icon-menu'
            },
            //是否折叠
            isCollapse: false
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login');
        },
        //获取所有的菜单
        async getMenuList(){
         const {data: res} = await  this.$http.get('menus')
         if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
         this.menulist = res.data
         console.log(res)
        },
        //点击按钮切换菜单
         toggleCollapse(){
           this.isCollapse = ! this.isCollapse
    }
        }
    }
    

</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: aliceblue;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color: #333741;
    .el-menu{
        border-right:0px ;
    }
}
.el-main{
    background-color: #eaeaea;
}
.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #4a4a4a;
    font-size: 10px;
    line-height: 24px;
    color:#fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>