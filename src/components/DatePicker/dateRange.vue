<template>
    <el-popover
    placement="top"
    width="600"
    v-model="visible">
        <div class="date-range-picker-panel">
            <div class="range-picker-body">
                <DatePicker 
                    @onPrevMonthChange='onPrevMonthChange'
                    @onNextMonthChange='onNextMonthChange'
                    className='is-left' :currentDate='current'/>
                <DatePicker 
                    @onNextMonthChange='onNextMonthChange'
                    @onPrevMonthChange='onPrevMonthChange'
                    className="is-right" :currentDate='nextDate'/>
            </div>
        </div>
        <div class="date-range-picker" slot="reference">
            <input type="text" v-model="startDate" readonly class="date-range-input" placeholder="开始日期">
            <span class="range-picker-separator">~</span>
            <input type="text" v-model="endDate" readonly class="date-range-input" placeholder="结束日期">
        </div>
    </el-popover>
    
</template>
<script>
import moment from 'moment'
import * as tool from '@/utils/tool'
import DatePicker from './datePicker'
export default {
    components:{
        DatePicker
    },
    props:{
        startDate:{

        },
        endDate:{}
    },
    data(){
        return{
            visible:false,
            current:new Date(),
            nextDate:new Date(moment().add(1,'month'))
            //calendarArr:[]
        }
    },
    created(){
        
    },
    methods:{
        onPrevMonthChange(prevMonth){
            this.current = prevMonth
        },
        onNextMonthChange(nextMonth){
            this.nextDate = nextMonth
        }
    }
}
</script>
<style lang="scss">
    $themeColor: #409eff;
    $textColor:#999;
    $wTextColor:#666;
    .date-range-picker-panel{
        color: #606266;
        line-height: 30px;
        .range-picker-body{
            min-width: 513px;
            
        }
    }
</style>