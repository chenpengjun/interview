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
                    @onCalendarChange='onCalendarChange'
                    :dateRange='dateRange'
                    :visible='visible'
                    className='is-left' :currentDate='current'/>
                <DatePicker 
                    @onNextMonthChange='onNextMonthChange'
                    @onPrevMonthChange='onPrevMonthChange'
                    @onCalendarChange='onCalendarChange'
                    :dateRange='dateRange'
                    :visible='visible'
                    className="is-right" :currentDate='nextDate'/>
            </div>
        </div>
        <div class="date-range-picker" slot="reference">
            <input type="text" v-model="startRangeDate" readonly class="date-range-input" placeholder="开始日期">
            <span class="range-picker-separator">~</span>
            <input type="text" v-model="endRangeDate" readonly class="date-range-input" placeholder="结束日期">
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
        endDate:{},
        onChange:{
            type:Function
        }
    },
    watch:{
        startDate(val){
            this.startRangeDate = val
        },
        endDate(val){
            this.endRangeDate = val
        },
        visible(val){
            if(val){
                this.dateRange = [new Date(this.startDate),new Date(this.endDate)]
            }
        }
    },
    data(){
        return{
            visible:false,
            current:new Date(),
            nextDate:new Date(moment().add(1,'month')),
            dateRange:[new Date(this.startDate),new Date(this.endDate)],
            startRangeDate:this.startDate,
            endRangeDate:this.endDate
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
        },
        onCalendarChange(date){
            let dateRange = this.dateRange
            dateRange.push(date)
            
            if(dateRange.length == 2){
                dateRange = this._sortDateRange(dateRange)
                this.visible = false
                // this.startRangeDate = moment(dateRange[0]).format('YYYY-MM-DD')
                // this.endRangeDate = moment(dateRange[1]).format('YYYY-MM-DD')
                this.dateRange = dateRange
                this.$emit('onChange',dateRange)
            }
            if(dateRange.length>2){
                dateRange.splice(0,2);
                this.dateRange = dateRange
            }
            
        },
        _sortDateRange(dateRange){
            const arr = dateRange.sort((a,b)=>{
                return Date.parse(a) - Date.parse(b);
            })
            return arr
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