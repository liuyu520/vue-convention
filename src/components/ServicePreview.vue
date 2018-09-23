<template>
    <div class="Tstore-payBox">
        <p>购买企业：<strong style="color:#333;">{{this.sharedState.defaultOrg.orgFullName}}</strong></p>

        <div class="Tstore-payBor"><p>服务项</p></div>

        <ServicePreviewItem :multiple="sharedState.multiple" v-for="option in packageData.products" :product="option"></ServicePreviewItem>

        <div class="Tstore-payBor"><p>支付信息</p></div>
        <PayMoneyInfo  :shouldPayPrice="shouldPayPrice"  :originPrice="originPrice"></PayMoneyInfo>
    </div><!--Tstore-payBox-->
</template>
<script>
  import PayMoneyInfo from '@/components/PayMoneyInfo'
  import ServicePreviewItem from '@/components/ServicePreviewItem'
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    components: { PayMoneyInfo, ServicePreviewItem },
    props: ['packageData'],
    computed: {
      shouldPayPrice: function () {
        this.sharedState.shouldPayPrice = this.packageData.price * this.sharedState.multiple
        return this.sharedState.shouldPayPrice
      },
      originPrice: function () {
//        console.log('this.packageData.realPrice', this.packageData.realPrice)
        this.sharedState.originPrice = this.packageData.originPrice * this.sharedState.multiple
        return this.sharedState.originPrice
      }
    }
  }
</script>
