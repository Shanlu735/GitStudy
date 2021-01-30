<template>
<div>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">

  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item >用户管理</el-breadcrumb-item>
  <el-breadcrumb-item >用户列表</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/information'} ">用户信息</el-breadcrumb-item>
</el-breadcrumb>
       <!-- 搜索框 -->
       <el-row class="searchRow">
           <el-col>
            <el-input 
            placeholder="请输入内容" class="inputSearch" v-model="queryInfo.query"  clearable
            @clear="getUserList" >
          
           <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
           </el-input>
           <el-button type="success" class="addButton" @click="addDialogVisible = true" >添加用户</el-button>
           </el-col>
       </el-row>
       <!-- 表格 -->
      
  
  <el-table class="tableList"
    :data="userlist"
    border
    style="width: 100%"
    stripe="">
     <el-table-column
     fixed
      type="index"
      prop="id"
      label="ID"
      width="60"
      >
    </el-table-column>
     <el-table-column
      prop="username"
      label="姓名"
     >
    </el-table-column>
     <el-table-column
      prop="email"
      label="邮箱"
      width="250">
    </el-table-column>
     <el-table-column
      prop="mobile"
      label="电话"
      >
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色"
     >
    </el-table-column>
   
    <el-table-column
      
      prop="mg_state"
      label="状态"
      >
     
   <template slot-scope="scope">
     <!-- {{scope.row.mg_state}} -->
     <el-switch
  v-model="scope.row.mg_state"
  active-color="#13ce66"
  inactive-color="#ff4949" class="swith" @change="userStateChanged(scope.row)">
</el-switch>

   </template>

    </el-table-column>

    
    <el-table-column
      fixed="right"
      label="操作"
      width="170">
      <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-tooltip effect="dark" content="修改" placement="top">
      <el-button @click="showEditDialog(scope.row.id)"  type="primary" icon="el-icon-edit" size="mini" circle></el-button>
       </el-tooltip>
        
         <!-- 删除按钮 -->
         <el-tooltip effect="dark" content="删除" placement="top">
    <el-button type="danger"  icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)" circle></el-button>
        <!-- 分配角色按钮 -->
       </el-tooltip>
       
         <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
      <el-button type="warning"  icon="el-icon-setting" size="mini" circle></el-button>
       </el-tooltip>
      </template>  
      
    </el-table-column>
    
    <!-- 筛选 -->
    <!-- <el-table-column
      prop="tag"
      label="筛选"
      width="100"
      :filters="[{ text: '超级管理员', value: '超级管理员' }, { text: '普通用户', value: '普通用户' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '超级管理员' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>  -->
  </el-table>


       <!-- 分页 -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    </el-card>
    <!-- 添加用户对话框 -->
    
    <el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%" @close="addDialogClosed">
   <!-- 内容主题区 -->
  <el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="70px" >
  <el-form-item label="用户名" prop="username">
    <el-input  v-model="addForm.username" clearable></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input  v-model="addForm.password" clearable></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input  v-model="addForm.email" clearable></el-input>
  </el-form-item>
   <el-form-item label="手机号" prop="mobile">
    <el-input  v-model="addForm.mobile" clearable></el-input>
  </el-form-item>
  </el-form>
 
  <!-- 底部按钮区 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

<!-- 修改用户对话框 -->
<el-dialog
  title="用户修改"
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClosed"
 >
  <!-- 内容主题区 -->
  <el-form :model="editForm" status-icon :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="用户名">
    <el-input  v-model="editForm.username"  disabled clearable></el-input>
  </el-form-item>
   <!-- <el-form-item label="密码" prop="password">
    <el-input  v-model="addForm.password" clearable></el-input>
  </el-form-item> -->
   <el-form-item label="邮箱" prop="email">
    <el-input  v-model="editForm.email" clearable></el-input>
  </el-form-item>
   <el-form-item label="手机号" prop="mobile">
    <el-input  v-model="editForm.mobile" clearable></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>

    </div>
</template>
<script>
export default {

        created(){
        this.getUserList()
    },
     data() {
         //验证邮箱
         var checkEmail = (rules,value,cb) =>{
             //验证邮箱正则规则
          const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
          if(regEmail.test(value)){
          //合法邮箱
          return cb()
         }
         cb(new Error('请输入合法的邮箱'))
         }
         //校验手机号
         var checkMobile = (rules,value,cb) =>{

             //验证手机号正则表达式
             const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]14[57])[0-9]{8}$/
             if(regMobile.test(value)){
                 return cb()
             }
             cb(new Error('请输入合法的手机号'))
         }
      return {
          //获取用户列表的参数
          queryInfo:{
          query:'',
          //当前页数
          pagenum:1,
          //每页显示多少条数据
          pagesize:2
          },
          userlist:[],
          total: 0,
          //控制用户添加对话框的显示
          addDialogVisible: false,

          //添加用户的表单
          addForm:{
              username:'',
              password:'',
              email:'',
              mobile:''
          },
          //添加表单的验证对象
          addFormRules: {
              username:[
                  {required: true, message:'请输入用户名',trigger:'blur'},
                  {min:2 , max:10, message:'用户名的长度在2~10个字符之间',trigger:'blur'}
              ],
               password:[
                  {required: true, message:'请输入密码',trigger:'blur'},
                  {min:6 , max:16, message:'密码的长度在6~16个字符之间',trigger:'blur'}
              ],
              email:[
                  {required: true, message:'请输入邮箱',trigger:'blur'},
                  {validator:checkEmail, trigger:'blur'}
                  
              ],
               mobile:[
                  {required: true, message:'请输入手机号',trigger:'blur'},
                  {validator:checkMobile, trigger:'blur'}
                  
              ]
          },
          //控制用户修改对话框
          editDialogVisible: false,
          //查询到用户的对象

          editForm:{
            username:'',
            email:'',
            mobile:'',

          },
          //修改表单验证
          editFormRules:{
             email:[
                  {required: true, message:'请输入邮箱',trigger:'blur'},
                  {validator:checkEmail, trigger:'blur'}
                  
              ],
               mobile:[
                  {required: true, message:'请输入手机号',trigger:'blur'},
                  {validator:checkMobile, trigger:'blur'}
                  
              ]
          },
       
      }
     },
     methods: {
      handleClick(row) {
        console.log(row);
      },

      filterTag(value, row) {
        return row.tag === value;
      },
       //获取用户列表的请求
     async getUserList(){
         //query、pagenum、
         //- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
        //  const AUTH_TOKEN = localStorage.getItem('token')
        //  this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      
      
      const {data : res} =  await  this.$http.get(
         'users',{params:this.queryInfo}
          )
      console.log(res)
     if(res.meta.status !== 200){
          return this.$message.error('获取用户列表失败！')
     }
     this.userlist = res.data.users
     this.total = res.data.total

      },
    
    //监听pagesize改变的事件
    handleSizeChange(newSize){
        console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getUserList()

    },
    //监听页码
  handleCurrentChange(newPage){
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()

  },
  //监听switch开关状态的改变
  async userStateChanged(userinfo){

      console.log(userinfo)
     const {data : res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
     if(res.meta.status !== 200){
         userinfo.mg_state = !userinfo.mg_state
         return this.$message.error('更新用户状态失败！')
     }
     this.$message.success('更新用户状态成功！')

  },
  //监听添加用户对话框的关闭
  addDialogClosed(){
        this.$refs.addFormRef.resetFields()
  },
  //监听添加用户确定事件
  addUser(){
      this.$refs.addFormRef.validate(async valid =>
      {
          console.log(valid)
          if(!valid) return
          //可以发起添加用户的网络请求
       const {data: res}  = await  this.$http.post('users', this.addForm)
          if(res.meta.status !==201){
              this.$message.error('添加用户失败！')
          }
          this.$message.success('添加用户成功！')
          //隐藏添加对话框
          this.addDialogVisible = false
          //刷新列表
          this.getUserList()
      })
  },
  //展示编辑用户的对话框
  async showEditDialog(id){

   const {data: res} = await this.$http.get('users/' + id)
   if(res.meta.status !== 200){
     return this.$message.error('查询用户列表失败！')
   }
   this.editForm = res.data
    this.editDialogVisible = true

      
  },
  //监听修改用户对话框的关闭
  editDialogClosed(){
        this.$refs.editFormRef.resetFields()
  },
  //监听添加用户确定事件
  editUser(){
      this.$refs.editFormRef.validate(async valid =>
      {
          console.log(valid)
          if(!valid) return
          //可以发起添加用户的网络请求
       const {data: res}  = await  this.$http.put('users/' + this.editForm.id, {email: this.editForm.email
       ,mobile:this.editForm.mobile})
          if(res.meta.status !==200){
              this.$message.error('修改用户失败！')
          }
          this.$message.success('修改用户成功！')
          //隐藏添加对话框
          this.editDialogVisible = false
          //刷新列表
          this.getUserList()
      })
  },
  //根据Id删除对应的用户信息
  async removeUserById(id){
    //弹框询问
   const confirmResult =  await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
    }).catch(err =>{
         return err
    })
    //如果用户确认删除，则返回字符串
   
    //如果用户取消了删除，则返回字符串cancel
    if(confirmResult !== 'confirm'){
      return this.$message.info('已取消删除')
    }
     console.log('确认了删除')
    const {data : res} = await this.$http.delete('users/' + id)
    if(res.meta.status !== 200){
      return this.$message.error('删除用户失败！')
    }
    this.$message.success('删除用户成功！')
    this.getUserList()

  }

  
     }
}
  

</script>
<style lang="less" scoped>
.box.card{
    height: 100%;
}
.inputSearch{
    width: 400px;
}
.searchRow{
    margin-top: 20px;
}
.addButton{
    margin-left: 5px;
}
.tableList{
    margin-top: 10px;
}
.swith{
    margin: 20px;
}
.el-pagination{
    margin-top: 15px;
}
</style>