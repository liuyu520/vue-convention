<template>
    <div class="Tstore-pay-jine">
        <p>订单金额：<span>{{originPrice}}.00</span></p>
        <p>优惠金额：<span>{{discount}}.00</span></p>
        <p>应付金额：<span class="fz20">{{shouldPayPrice}}.00</span></p>
    </div>
</template>
<script>
  export default {
    props: ['shouldPayPrice', 'originPrice'],
    computed: {
      discount: function () {
        return this.originPrice - this.shouldPayPrice
      }
    }
  }
</script>
