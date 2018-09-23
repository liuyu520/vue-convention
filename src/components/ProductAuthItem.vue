<template>
<li>
          <div class="Taocan-title clearfloat">
            <p class="fl">{{displayName}}</p><p class="fr">￥{{payPrice}}元</p>
          </div>
          <div class="Taocan-text">
            <p  v-for="option in displayInfoList">{{option}}</p>
            <p>有效期：12个月</p>
            <p  >价格：5000元</p>
          </div>
        </li>
</template>
<script>
  export default {
    props: ['product'],
    computed: {
      displayName: function () {
        if (this.product) {
          return this.product.displayName
        } else {
          return '正在加载'
        }
      },
      displayInfoList: function () {
        let displayinfo = this.product.authInfo.displayinfo
        if (!displayinfo) {
          return []
        }
        displayinfo.split('##')
      },
      payPrice: function () {
        if (this.product) {
          return this.product.price
        } else {
          return '正在加载'
        }
      }
    }
  }
</script>
