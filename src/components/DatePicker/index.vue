<template>
    <div class="date-picker" style="width:300px;margin:0px auto">
        <el-popover
            placement="top"
            trigger='manual'
            @show="onPopoverShow"
            @hide='onPopoverHide'
            v-model="visible">
            <div class="date-panel" style="width:300px">
                <div class="date-panel-select">
                    <div class='title'>选择日期:</div>
                    <DateRange @onChange="onDateRangeChange"  :startDate='startDate' :endDate='endDate'/>
                </div>
                <div class="date-quicky-select">
                    <div class="title">快捷日期:</div>
                    <ul>
                        <li @click.prevent ="onQuickChange(item)" :class="[{selected:quickyFilterValue.value == item.value},{ 'diabled':diabledToday && item.value == 0}]" :key="index" v-for="(item,index) in quickyFilter"><span>{{ item.label }}</span></li>
                    </ul>
                </div>
                <el-divider></el-divider>
                <div class="date-picker-footer">
                    <el-button size="mini" type="default" @click="visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click.stop="onConfirmDate">确定</el-button>
                </div>
            </div>
            <el-input
                slot="reference"
                placeholder="请选择日期"
                @focus='onOpenPopver'
                v-model="dateValue">
                <i slot="suffix" class="el-input__icon el-icon-date"></i>
            </el-input>
        </el-popover>
    </div>
</template>
<script>
import moment from 'moment'
import DateRange from './dateRange'
export default {
    components:{
        DateRange
    },
    data(){
        return{
            dateValue:'',
            visible:false,
            startDate:null,
            endDate:moment().format('YYYY-MM-DD'),
            quickyFilterValue:{
                
            },
            dateRange:[],
            quickyFilter:[{
                value:0,
                label:'今天'
            },{
                value:1,
                label:'昨天'
            },{
                value:7,
                label:'过去7天'
            },{
                value:14,
                label:'过去14天'
            },{
                value:30,
                label:'过去30天'
            },{
                value:90,
                label:'过去90天'
            }]
        }
    },
    props:{
        change:{
            //type:Function
        },
        diabledToday:{
            type:Boolean,
            default:false
        },
        
    },
    watch:{
        visible(value){
           if(value){
                if(!this.diabledToday && this.dateValue==''){
                    this.startDate = moment().format('YYYY-MM-DD')
                    this.quickyFilterValue = {
                        value:0,
                        label:'今天'
                    }
                }else{
                    if(this.dateRange.length>0) return
                    this.startDate = moment().subtract(1,'days').format('YYYY-MM-DD')
                    this.quickyFilterValue = {
                        value:1,
                        label:'昨天'
                    }
                }
            }
        }
    },
    
    created(){
        
    },
    destroyed(){
        
    },
    methods:{
        onPopoverShow(){
            
        },
        onPopoverHide(){
            
        },
        onOpenPopver(){
            this.visible = true
        },
        onConfirmDate(){
            console.log(this)
            if(this.quickyFilterValue.label){
                this.dateValue = this.quickyFilterValue.label
                this.$emit('change',[new Date(this.startDate),new Date(this.endDate)])
            }else{
                let transfer_dateRange = []
                this.dateRange.map((item,i)=>{
                    transfer_dateRange.push(moment(item).format('YYYY-MM-DD'))
                })
                this.dateValue = transfer_dateRange.join('至')
                this.$emit('change',this.dateRange)
            }
            
            this.visible = false
            
        },
        onQuickChange(item){
            if(this.diabledToday && item.value ==0){
                return
            }
            this.quickyFilterValue = item
            this.startDate = moment().subtract(item.value, 'days').format('YYYY-MM-DD')
            this.endDate = moment().format('YYYY-MM-DD')
        },
        onPickerFocus(){
            this.visible = true
        },
        onPickerChange(){
            
        },
        onDateRangeChange(dateRange){
            this.quickyFilterValue={}
            this.dateRange = dateRange
            this.startDate = moment(dateRange[0]).format('YYYY-MM-DD')
            this.endDate = moment(dateRange[1]).format('YYYY-MM-DD')
        }
    }
}
</script>
<style lang="scss">
    $themeColor: #409eff;
    $textColor:#999;
    $wTextColor:#666;
        .date-panel{
            padding:12px;
            width:300px;
            .date-quicky-select{
                text-align: left;
                margin-top: 12px;
                .title{
                    color:$textColor;
                    font-size: 14px;
                    margin-bottom: 6px;
                }
                ul,li{
                    list-style: none;
                    padding:0px;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        color:$textColor;
                        line-height: 24px;
                        font-size: 14px;
                        width:50%;
                        border-radius: 4px;
                        margin-bottom: 4px;
                        span{
                            padding-left: 6px;
                        }
                    }
                    li.diabled{
                        opacity: 0.5;
                    }
                    li.selected{
                        background-color: $themeColor;
                        color:#ffffff;
                    }
                    li:hover{
                        background-color: $themeColor;
                        color:#ffffff;
                        cursor: pointer;
                    }
                    li.diabled:hover{
                        background-color:#ffffff;
                        color:$textColor;
                    }
                }
            }
            .date-picker-footer{
                text-align: right;
            }
            .date-panel-select{
                text-align: left;
                .title{
                   color:$textColor;
                   font-size: 14px;
                   margin-bottom: 6px;
                }
                
            } 
        }
</style>