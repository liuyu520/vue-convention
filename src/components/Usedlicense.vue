<template>
    <div class="Tstore-infor">
        <p class="Tstore-buleTitle">已购买服务</p>
        <UsedlicenseItemProduct  v-show="showAll || index==0" v-for="(option, index) in licenceInfoList" :licenceInfo="option"></UsedlicenseItemProduct>
        <a v-if="canShowAll" class="btn-zhankai" @click="showAll=true;canShowAll=false">展开更多</a>
    </div>
</template>
<script>
//  import examService from '@/services/examService'
  import UsedlicenseItemProduct from '@/components/UsedlicenseItemProduct'
  export default {
    components: { UsedlicenseItemProduct },
    props: [ 'licenceInfoList' ],
    data: () => ({
      showAll: false,
      canShowAll: true // "展开更多" 按钮是否显示
    }),
    created () {
      /*examService.licenceInfoList().then(licenceInfoList => {
        this.licenceInfoList = licenceInfoList
      })*/
    }
  }
</script>
