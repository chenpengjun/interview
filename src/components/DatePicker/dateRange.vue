<template>
    <el-popover
    placement="top"
    width="600"
    v-model="visible">
        <div class="date-range-picker-panel">
            <div class="range-picker-body">
                <div class="range-picker-content is-left">
                    <div class="range-picker-content-header">
                        <button @click="onPrevMonthChange"><i class="el-icon-arrow-left"></i></button>
                        <div class="">{{ time.year }}年 {{ time.month+1}} 月</div>
                        <button @click="onNextMonthChange"><i class="el-icon-arrow-right"></i></button>
                        
                    </div>
                    <table cellspacing='0' cellpadding='0' class="date-table">
                        <tbody>
                            <tr>
                                <th :key="index" v-for="(item,index) in calendarTitleArr">{{ item}}</th>
                            </tr>
                            <tr class="date-table-row" :key="index" v-for="(item,index) in calendarArr">
                                <td :class="isCurrentMonth(obj)" :key="tdIndex" v-for="(obj,tdIndex) in item"><div><span>{{ obj.day}}</span></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="range-picker-content is-right">
                    <div class="range-picker-content-header">
                        <div class="">2018 年 12 月</div>
                    </div>
                    <table class="date-table" cellspacing='0' cellpadding='0'>
                        <tbody>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                            <tr class="date-table-row">
                                <td class="prev-month"><div><span>25</span></div></td>
                                <td class="prev-month"><div><span>26</span></div></td>
                                <td class="prev-month"><div><span>27</span></div></td>
                                <td class="prev-month"><div><span>28</span></div></td>
                                <td class="prev-month"><div><span>29</span></div></td>
                                <td class="prev-month"><div><span>30</span></div></td>
                                <td class="available"><div><span>1</span></div></td>
                            </tr>
                            <tr class="date-table-row">
                                <td class="prev-month"><div><span>25</span></div></td>
                                <td class="prev-month"><div><span>26</span></div></td>
                                <td class="prev-month"><div><span>27</span></div></td>
                                <td class="prev-month"><div><span>28</span></div></td>
                                <td class="prev-month"><div><span>29</span></div></td>
                                <td class="prev-month"><div><span>30</span></div></td>
                                <td class="available"><div><span>1</span></div></td>
                            </tr>
                            <tr class="date-table-row">
                                <td class="available"><div><span>25</span></div></td>
                                <td class="available"><div><span>26</span></div></td>
                                <td class="available"><div><span>27</span></div></td>
                                <td class="available"><div><span>28</span></div></td>
                                <td class="available"><div><span>29</span></div></td>
                                <td class="available"><div><span>30</span></div></td>
                                <td class="available"><div><span>1</span></div></td>
                            </tr>
                            <tr class="date-table-row">
                                <td class="prev-month"><div><span>25</span></div></td>
                                <td class="prev-month"><div><span>26</span></div></td>
                                <td class="prev-month"><div><span>27</span></div></td>
                                <td class="prev-month"><div><span>28</span></div></td>
                                <td class="prev-month"><div><span>29</span></div></td>
                                <td class="prev-month"><div><span>30</span></div></td>
                                <td class="available"><div><span>1</span></div></td>
                            </tr>
                            <tr class="date-table-row">
                                <td class="prev-month"><div><span>25</span></div></td>
                                <td class="prev-month"><div><span>26</span></div></td>
                                <td class="prev-month"><div><span>27</span></div></td>
                                <td class="prev-month"><div><span>28</span></div></td>
                                <td class="prev-month"><div><span>29</span></div></td>
                                <td class="prev-month"><div><span>30</span></div></td>
                                <td class="available"><div><span>1</span></div></td>
                            </tr>
                            <tr class="date-table-row">
                                <td class="prev-month"><div><span>25</span></div></td>
                                <td class="prev-month"><div><span>26</span></div></td>
                                <td class="prev-month"><div><span>27</span></div></td>
                                <td class="prev-month"><div><span>28</span></div></td>
                                <td class="prev-month"><div><span>29</span></div></td>
                                <td class="prev-month"><div><span>30</span></div></td>
                                <td class="available"><div><span>1</span></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
import * as tool from '@/utils/tool'
export default {
    data(){
        let {year, month, day} = tool.getNewDate(new Date());
        return{
            visible:true,
            calendarTitleArr: ['日','一','二','三','四','五','六'],
            time: {year, month, day},
            //calendarArr:[]
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
                clickDay: false,
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
        onPrevMonthChange(){
            let prevMonth = tool.getDate(this.time.year,this.time.month-1,1)
            this.time = tool.getNewDate(prevMonth)
        },
        onNextMonthChange(){
            let prevMonth = tool.getDate(this.time.year,this.time.month+1,1)
            this.time = tool.getNewDate(prevMonth)
        },
        isCurrentMonth(item){
            if(this.time.month != item.month){
                return 'prev-month'
            }else{
                return 'available'
            }
        }
    },
    props:{
        startDate:{

        },
        endDate:{}
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
                }
            }
            .range-picker-content.is-left{
                border-right: 1px solid #e4e4e4;
            }
        }
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