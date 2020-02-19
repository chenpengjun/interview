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
                    <DateRange :startDate='startDate' :endDate='endDate'/>
                </div>
                <div class="date-quicky-select">
                    <div class="title">快捷日期:</div>
                    <ul>
                        <li @click.prevent ="onQuickChange(item)" :class="{selected:quickyFilterValue.value == item.value}" :key="index" v-for="(item,index) in quickyFilter"><span>{{ item.label }}</span></li>
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
            visible:true,
            startDate:null,
            endDate:moment().format('YYYY-MM-DD'),
            quickyFilterValue:{
                value:0,
                label:'今天'
            },
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
        diabledToday:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        visible(value){
           if(value){
               if(!this.diabledToday && this.dateValue==''){
                   console.log('aaa')
                    this.startDate = moment().format('YYYY-MM-DD')
                }
            }
        }
    },
    
    created(){
        if(!this.diabledToday && this.dateValue==''){
            this.startDate = moment().format('YYYY-MM-DD')
        }
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
            this.dateValue = this.quickyFilterValue.label
            this.visible = false
        },
        onQuickChange(item){
            this.quickyFilterValue = item
            this.startDate = moment().subtract(item.value, 'days').format('YYYY-MM-DD')
        },
        onPickerFocus(){
            this.visible = true
        },
        onPickerChange(){
            console.log('bbb')   
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
                    li.selected{
                        background-color: $themeColor;
                        color:#ffffff;
                    }
                    li:hover{
                        background-color: $themeColor;
                        color:#ffffff;
                        cursor: pointer;
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