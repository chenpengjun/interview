<template>
    <div :class="['range-picker-content ',className]">
        <div class="range-picker-content-header">
            <button v-if="className == 'is-left'" @click="onPrevMonthChange"><i class="el-icon-arrow-left"></i></button>
            <div class="">{{ time.year }}年 {{ time.month+1}} 月</div>
            <button v-if="className == 'is-right'" @click="onNextMonthChange"><i class="el-icon-arrow-right"></i></button>
            
        </div>
        <table cellspacing='0' cellpadding='0' class="date-table">
            <tbody>
                <tr>
                    <th :key="index" v-for="(item,index) in calendarTitleArr">{{ item}}</th>
                </tr>
                <tr class="date-table-row" :key="index" v-for="(item,index) in calendarArr">
                    <td :class="[isCurrentMonth(obj),{ 'current-date':isCurrentDay(obj) },{'in-range':isInRange(obj)},{ 'start-date': range.indexOf(obj.dateStr)>-1}]" @click="onCalendarChange(obj)" :key="tdIndex" v-for="(obj,tdIndex) in item"><div><span>{{ obj.day}}</span></div></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import moment from 'moment'
import * as tool from '@/utils/tool'
export default {
    data(){
        let {year, month, day} = tool.getNewDate(this.currentDate);
        return{
            calendarTitleArr: ['日','一','二','三','四','五','六'],
            time: {year, month, day},
            show:false,
            range:[]
            //calendarArr:[]
        }
    },
    watch:{
        currentDate(value){
            this.time = tool.getNewDate(value)
        },
        dateRange(value){
            let range = value.map((item,i)=>{
                return moment(item).format('YYYY-MM-DD')
            })
            this.range = range
        }
    },
    computed:{
        calendarArr(){
            let calendarArr = []
            let {year, month, day} = tool.getNewDate(tool.getDate(this.time.year, this.time.month, 1));
            let currentFirstDay = tool.getDate(year, month, 1);
            let weekDay = currentFirstDay.getDay();
            let startTime = currentFirstDay - (weekDay) * 24 * 60 * 60 * 1000;
            let monthDayNum;
            if (weekDay == 5 || weekDay == 6){
            monthDayNum = 42
            }else {
            monthDayNum = 42
            };

            for (let i = 0; i < monthDayNum; i++) {
                let newMonth = tool.getNewDate(new Date(startTime + i * 24 * 60 * 60 * 1000)).month
            calendarArr.push({
                date: new Date(startTime + i * 24 * 60 * 60 * 1000),
                year: year,
                month: newMonth,
                day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
                dateStr:moment(new Date(startTime + i * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'),
                timestamp:Date.parse(moment(new Date(startTime + i * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'))
            })
            };
            let groupCalendar = []
            for(var i=0;i<calendarArr.length;i+=7){
                groupCalendar.push(calendarArr.slice(i,i+7));
            }
            return groupCalendar
        }
    },
    created(){
        
    },
    methods:{
        isInRange(obj){
            if(this.range.length == 2){
                let start = Date.parse(this.range[0])
                let end = Date.parse(this.range[1])
                if(obj.timestamp>=start && obj.timestamp<=end){
                    return true
                }
            }else{
                return false
            }
        },
        onCalendarChange(obj){
            this.$emit('onCalendarChange',obj.date)
            
        },
        onPrevMonthChange(){
            let prevMonth = tool.getDate(this.time.year,this.time.month-1,1)
            let nextMonth = tool.getDate(this.time.year,this.time.month,1)
            this.$emit('onPrevMonthChange',prevMonth)
            this.$emit('onNextMonthChange',nextMonth)
        },
        onNextMonthChange(){
            let nextMonth = tool.getDate(this.time.year,this.time.month+1,1)
            let prevMonth = tool.getDate(this.time.year,this.time.month,1)
            this.$emit('onNextMonthChange',nextMonth)
            this.$emit('onPrevMonthChange',prevMonth)
        },
        isCurrentMonth(item){
            if(this.time.month != item.month){
                return 'prev-month'
            }else{
                return 'available'
            }
        },
        isCurrentDay(item){
            let {year: currentYear, month: currentMonth, day: currentDay} = tool.getNewDate(new Date());
            let {year, month, day} = tool.getNewDate(item.date);
            return currentYear == year && currentMonth == month && currentDay == day;
        }
    },
    props:{
        startDate:{

        },
        endDate:{},
        className:'',
        currentDate:{
            type:Date
        },
        dateRange:{
            type:Array
        },
        visible:{
            type:Boolean
        }
    }
}
</script>
<style lang="scss">
      $themeColor: #409eff;
    $textColor:#999;
    $wTextColor:#666;
    .range-picker-content{
        float: left;
        width: 50%;
        box-sizing: border-box;
        margin: 0;
        .range-picker-content-header{
            position: relative;
            text-align: center;
            height: 28px;
            display: flex;
            justify-content: center;
            div{
                margin-left: 50px;
                margin-right: 50px;
                font-size: 16px;
                font-weight: 500;
            }
            button{
                border:0px;
            }
            button:active, button:focus{
                outline: 0;
                border-color: transparent;
                box-shadow:none;
            }
            button:hover i{
                color:$themeColor;
            }
        }
        .date-table{
            font-size: 12px;
            user-select: none;
            table-layout: fixed;
            width: 100%;
            th{
                padding: 5px;
                color: #606266;
                font-weight: 400;
                border-bottom: 1px solid #ebeef5;
                text-align: center;
            }
            td{
                width: 32px;
                height: 30px;
                padding: 4px 0;
                box-sizing: border-box;
                text-align: center;
                cursor: pointer;
                position: relative;
                div{
                    height: 30px;
                    padding: 3px 0;
                    box-sizing: border-box;
                    span{
                        width: 24px;
                        height: 24px;
                        display: block;
                        margin: 0 auto;
                        line-height: 24px;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        border-radius: 50%;
                    }
                }
            }
            .next-month, .prev-month{
                color: #c0c4cc;
            }
            td.current-date{
                div{
                    margin-left: 5px;
                    border-top-left-radius: 15px;
                    border-bottom-left-radius: 15px;
                    span{
                        color:#409eff;
                    }
                }
            }
            td.start-date{
                div{
                    margin-left: 5px;
                    border-top-left-radius: 15px;
                    border-bottom-left-radius: 15px;
                    span{
                        background-color: #409eff;
                        color:#ffffff;
                    }
                }
            }
            td.end-date{
                div{
                    margin-left: 5px;
                    border-top-left-radius: 15px;
                    border-bottom-left-radius: 15px;
                    span{
                        background-color: #409eff;
                        color:#ffffff;
                    }
                }
            }
            td.in-range{
                div{
                    background-color: #f2f6fc;
                    border-radius: 0px;
                    margin-left: 0px;
                }
            }
            
        }
    }
    .range-picker-content.is-left{
        border-right: 1px solid #e4e4e4;
    }
    .date-range-picker{
        color:$wTextColor;
        transition: opacity 0.3s;
        border: 1px solid #d9d9d9;
        font-size: 14px;
        height:24px;
        border-radius: 4px;
        padding: 4px 11px;
        .date-range-input{
            width: 44%;
            height: 99%;
            text-align: center;
            background-color: transparent;
            border: 0;
            outline: 0;
        }
        .date-range-input::placeholder{
            opacity: 0.5;
        }
    }
    .date-range-picker:hover{
        border-color:$themeColor;
    }
</style>