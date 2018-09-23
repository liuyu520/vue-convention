<template>
    <!-- v_validate:校验规则,例如:required,email,confirmed:{target}
     className : 自定义的class,不会覆盖,而是合并
     name2: input的name属性值
     data_vv_as: 错误提示的字段名称,即"用户名不合法"中的'用户名'
     使用说明:示例
     < ValidateInput  :v_validate="'required|mobile'" name2="invoice_phone"
                                             placeholder="请填写签收人手机号" v-model="invoice_dto.deliverPhone" >< /ValidateInput>
       注意:   v_validate前面必须加上冒号,即':'

       失去焦点才会校验
       1. 失去焦点时 重置showError 为true
       2. showError 的作用是 用户输入时不管三七二十一 都不显示错误提示,
        3.提示信息errors.first(nam) 优先级比errormessage 高
       前端校验原则: 用户在输入过程中,不显示错误提示
     -->
        <input name="invoice_phone"
                @input="update2($event.target.value)"
                v-model="val"  class="inf-input"  type="text"
                   autocomplete="off"/>


</template>
<script>
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    props: [ 'nam', 'className', 'value', 'v_validate', 'data_vv_as', 'placeholder', 'haserror', 'errormessage', 'clicksubmit' ],
    data: () => ({
      val: '',
      showError: true
    }),
    created: function () {
      this.sharedState.bus.$on('invoice_submit', function () {
        // ...
        console.log('submit!!!!!!!!!!!!')
        this.showError = true
      })
    },
    computed: {
      /*showErrorResult: function () {
        if (!this.showError && this.clicksubmit) {
          return true;
        }
        return this.showError;
      }*/
    },
    methods: {
      update2: function (val) {
//        this.val = val
        this.$emit('input',val)
        console.log('val', val)

        //清除二次错误提示
//        this.haserror = false
        this.showError = false
//        this.clicksubmit = false
        /*if (this.haserror) {
          console.log('有错误')
          if (!this.errors.has(this.nam)) {
            this.haserror = false
          }
        }*/
      }/*,
      blurAction: function () {
        if (this.errors.has(this.nam)) {
          this.showError = true
        } else {
          this.showError = false
        }
        console.log('this.showError', this.showError)
      }*/
    }
  }
</script>
