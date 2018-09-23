<template>
    <div class="Tstore-infor-mid clearfloat">
        <p class="Tstore-buleTitle fl" style="line-height:28px; margin-right:30px;">发票信息</p>
        <a class="Tcode-btn fl" style="width:110px;">电子发票(普票)</a>
        <a class="Tcode-btn fl" style="width:110px;">不要发票</a>
        <a class="Tcode-btn-bule fl" @click="openInvoiceDialog">填写发票信息</a>
    </div>

</template>
<script>
  import GlobalEmptyDialog from '@/components/dialog/GlobalEmptyDialog'
  import CreateOrgComp from '@/components/dialog/CreateOrgComp'
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    components: { GlobalEmptyDialog, CreateOrgComp },
    props: ['shouldPayPrice', 'originPrice'],
    computed: {
      discount: function () {
        return this.originPrice - this.shouldPayPrice
      }
    },
    methods: {
      openInvoiceDialog:function () {
//        let GlobalEmptyDialog = new GlobalEmptyDialog();
        this.sharedState.currentView = CreateOrgComp;// 'create_org_comp'
        this.sharedState.dialogShow = true
      }
    }
  }
</script>
