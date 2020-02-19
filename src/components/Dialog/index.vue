<template>
    <transition name='cdialog-animation'>
        <div :class="`${prefixCls}`" v-show="visible">
            <div :class="`${prefixCls}-modal-mask`"></div> 
            <div 
                :class="`${prefixCls}-modal-wrap`" 
                role="dialog"
                aria-modal="true"
                @click="onCloseWrap"
                v-show="visible">
                <div 
                role='document'
                
                :style="{width:width+'px'}"
                :class="`${prefixCls}-modal`">
                    <div :class="`${prefixCls}-modal-content`" >
                        <div :class="`${prefixCls}-modal-header`">
                            <a @click="onClose" v-if='showClose' href="javascript:;" :class="`${prefixCls}-modal-close`">
                                <i class="el-icon-close"></i>
                            </a>
                            <slot name="title">
                                <div :class="`${prefixCls}-model-title`">{{ title }}</div>
                            </slot>
                        </div>
                        <div :class="`${prefixCls}-modal-body`">
                            <slot name="content">
                                <div >{{ content }}</div>
                            </slot>
                        </div>
                        <div :class="`${prefixCls}-modal-footer`" v-if="footer">
                            <slot name="footer">
                                <el-button type="default" @click="onClose">{{ cancelText }}</el-button>
                                <el-button type="primary" @click="onConfirm">{{ okText }}</el-button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name:'CDialog',
    data(){
        return{
            prefixCls:'cdialog',
        }
    },
    props:{
        content:{
        },
        //弹窗标题
        title:{
            type:String,
            default:'我是标题'
        },
        //点击遮罩能否关闭
        maskClosable:{
            type:Boolean,
            default:true
        },
        //dialog是否可见
        visible:{
            type:Boolean,
            default:false
        },
        //确认按钮文字
        okText:{
            type:String,
            default:'确定'
        },
        //取消按钮文字
        cancelText:{
            type:String,
            default:'取消'
        },
        //确定按钮事件
        onOk:{
            type:Function
        },
        //取消按钮事件
        onCancel:{
            type:Function
        },
        //弹窗宽度
        width:{
            type:String,
            default:500
        },
        //是否显示关闭按钮
        showClose:{
            type:Boolean,
            default:true
        },
        //是否显示底部
        footer:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        visible(val){
            if(val){
                document.body.style.overflow = 'hidden';
            }else{
                document.body.style.overflow = '';
            }
        }
    },
    created(){
        
    },
    methods:{
        onCloseWrap(e){
            if(e.target === e.currentTarget && this.maskClosable){
                this.$emit('onCancel')
            }
        }, 
        onClose(){
            this.$emit('onCancel')
        },
        onConfirm(){
            this.$emit('onOk')
        }
    }
}
</script>
<style lang="less">
    @dialog-prefix-cls: ~'cdialog';
    .cdialog-animation-enter, .cdialog-animation-leave-to{
        opacity: 0
    }
    .cdialog-animation-enter-active, .cdialog-animation-leave-active{
        transition: opacity .5s
    }
    .@{dialog-prefix-cls} {
        &-modal-mask{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.45);
        }
        &-modal-wrap{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1100;
            overflow: auto;
            outline: 0;
            -webkit-overflow-scrolling: touch;
        }
        &-modal{
            margin: 0px auto;
            position: relative;
            top:100px;
            z-index: 1200;
        }
        &-modal-content{
            position: relative;
            background-color: #ffffff;
            border: 0;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            top:50%;
        }
        &-modal-header{
            padding:16px 24px;
            color: rgba(0, 0, 0, 0.65);
            background: #fff;
            border-bottom: 1px solid #eaeaea;
            border-radius: 4px 4px 0 0;
            position: relative;
        }
        &-modal-close{
            position: absolute;
            right:0px;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            top:2px;
            border:0px;
            display: inline-block;
            i{
                font-size: 20px;
            }
        }
        &-modal-body{
            padding: 24px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
            max-height: 250px;
            overflow-y: auto;
        }
        &-modal-footer{
            padding: 10px 16px;
            text-align: right;
            background: transparent;
            border-top: 1px solid #e8e8e8;
            border-radius: 0 0 4px 4px;
        }
    }
</style>