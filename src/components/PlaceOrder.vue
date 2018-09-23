<template>
            <createOrgComp  name="aaccc"></createOrgComp>
</template>
<script>
import createOrgComp from '@/components/dialog/CreateOrgComp'
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, {
  events: 'input',
  // 指定locale为中文
  locale: 'zh_CN',
  inject: true
});
export default {
  components: { createOrgComp },
  event: 'input'
}
</script>
