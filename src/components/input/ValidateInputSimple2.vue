<template>
    <div>
        <input @input="updateValue($event.target.value)"  v-bind:name="name2"  :value="value"  class="inf-input" :class="className" type="text" placeholder="请填写企业名称"
                  value="aaaaaaaaaaaaaaaaaaaa" autocomplete="off"/>
    </div>

</template>
<script>
  export default {
    props: [ 'value' ],
    methods: {
      updateValue: function (value) {
        var formattedValue = value + 'ccc'
        // 如果值尚不合规，则手动覆盖为合规的值
        if (formattedValue !== value) {
//          this.$refs.input.value = formattedValue
        }
        // 通过 input 事件带出数值
        this.$emit('input', (formattedValue))
      }
    }
  }
</script>
