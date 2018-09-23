<template>
    <div class="Tstore-infor">
        <p class="Tstore-buleTitle">要购买服务</p>
        <div class="Tstore-proName"><p>{{packageDisplayName}}</p></div>
        <div class="Tstore-jiage"><span class="yuanjia">原价 ¥{{originPriceTotal}}.00</span><span class="fz14">优惠价</span><span class="fz16">￥{{payPriceTotal}}.00</span></div>
        <ProductAuthlist :products="packageData.products"></ProductAuthlist>
        <div class="Tstore-num-box clearfloat">
            <div class="fl fz12">请选择购买数量</div>
            <div class="Tstore-num-input fl"><input @input="modifyCounter($event.target.value)" :value="sharedState.multiple" type="text" ></div>
            <div class="fl input-choice"><i class="i-choice-t"  @click="inc"></i><i class="i-choice-b" @click="dec" ></i></div>
        </div>
    </div>
</template>
<script>
import ProductAuthlist from '@/components/ProductAuthList'
import sharedStateMixin from '@/services/status/sharedState.mixin'
export default {
  mixins: [sharedStateMixin],
  components: { ProductAuthlist },
  props: ['packageData'],
  data: () => ({
    originPrice: 300
  }),
  updated: function () {
    console.log('this.packageDataaa', this.packageData)
  },
  methods: {
  },
  computed: {
    originPriceTotal: function () {
      let realPrice = 0
      if (this.packageData) {
        realPrice = this.packageData.originPrice
      } else {
        realPrice = 33
      }
      console.log('realPrice', realPrice)
      return realPrice * this.sharedState.multiple
    },
    payPriceTotal: function () {
      let price = 0
      if (this.packageData) {
        price = this.packageData.price
      }
      return price * this.sharedState.multiple
    },
    packageDisplayName: function () {
      if (this.packageData) {
        return this.packageData.displayName
      } else {
        return '正在加载'
      }
    }
  }
}
</script>

