<template>
    <div class="xiangmu-box">
        <p class="color-9">{{product.displayName}}</p>
        <p> {{displayInfo}} </p>
    </div>
</template>
<script>
  import {addMonth} from '@/shared/utils/mixins'
  export default {
    props: ['product', 'multiple'],
    computed: {
      displayInfo: function () {
        if (!this.product || !this.product.authInfo) {
          return ''
        }
//        console.log('authInfo:', this.product.authInfo)
        let authInfo = this.product.authInfo.authItems
        let html = []
        let periodAuthItem = 12
        for (let key in authInfo) {
          console.log('key', key)
          let authItem = authInfo[key]
          if (authItem.code === 'period' || authItem.code.indexOf('CIAdata') > -1) {
            periodAuthItem = authItem
            continue
          }
          // 版本和时间不能乘以倍数
          let val = Number(authItem.value) * this.multiple;
          if (authItem.code == 'version') {
            val = authItem.value
          }
          html.push(val + authItem.unit + '，')
        }

        // 设置时间
        html.push(periodAuthItem.value + periodAuthItem.unit + ' ')
        let now = new Date()
        let startDate = now.format('yyyy-MM-dd')
        let endDate = addMonth(now, periodAuthItem.value);
        console.log('endDate', endDate)
        let endDateStr = endDate.format('yyyy-MM-dd')
        let peroidStr = startDate + '至' + endDateStr
        return html.join('') + '，' + peroidStr
      }
    }
  }
</script>
