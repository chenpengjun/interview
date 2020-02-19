<template>
  <div class="Index">
    <c-dialog
      title="测试标题"
      content='测试内容啊'
      @onCancel='onCancel'
      @onOk='onOk'
      width='700'
      okText='确定'
      cancelText='取消'
      :showClose='true'
      :maskClosable='false'
      :visible='dialogVisible'>
        <el-table
          :data="tableData"
          slot="content"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
        <!-- <el-button slot="footer" type="primary" >确定</el-button> -->
    </c-dialog>
    
    <el-button type="primary" @click="onOpenDialog">打开弹窗</el-button>
    <div style="margin-top:20px">
      <CDatePicker
        :diabledToday='false'
      />
    </div>
    
  </div>
</template>

<script>
    import CDialog from '@/components/Dialog'
    import CDatePicker from '@/components/DatePicker'
    export default{
      components:{
        CDialog,CDatePicker
      },
      data(){
        return {
          dialogVisible:false,
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      created() {
        
      },
      methods:{
        onOpenDialog(){
          this.dialogVisible = true
        },
        onCancel(){
          this.dialogVisible = false
        },
        onOk(){
          this.dialogVisible = false
        }
      }
    }
</script>
<style lang="less" scoped>
  .Index{
    height:2000px;
    text-align: center;
    padding-top: 20px;
  }
</style>
