<template>
        <!--弹框-->
        <div class="pop-box" :style="bgStyle">
            <div class="pop-tab">
                <h2 class="fz16"><span>新增订购企业</span> <a title="关闭" @click="close" class="icon-close"></a></h2>
                <div style="text-align: center;color: #f24646;background-color: #fff2d9;height:40px;line-height: 40px; position: absolute;
    top: 50px;display: none;
    width: 100%; ">
                    <label class="dialog-all-in-one-error" for="">企业名称不能为空</label>
                </div>
                <div class="fp-tab">
                    <component v-bind:is="currentView">
                        <!-- 组件在 vm.currentview 变化时改变！ -->
                    </component>
                </div>
            </div>


        </div>
</template>
<script>
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    props: ['currentView'],
    computed: {
      bgStyle: function () {
        console.log('bgStyle',this.sharedState.dialogShow)
        if (this.sharedState.dialogShow) {
          console.log('显示')
          return { display: 'block' }
        } else {
          console.log('隐藏')
          return {}
        }
      }
    },
    methods: {
      close: function () {
        this.sharedState.dialogShow = false
      }
    }
  }
</script>
