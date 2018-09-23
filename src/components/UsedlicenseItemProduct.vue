<template>
    <div>
        <div class="Tstore-proName"><p>{{licenceInfo.displayName}}</p></div>
        <UsedlicenseItemProductItem  v-for="option in licenceInfo.licenceInfoList" :licenceInfoItem="option" ></UsedlicenseItemProductItem>
        <p class="text-padding"><span>已绑定服务商：</span><strong>{{licenceInfo.partnerFullName}}</strong></p>

    </div>
</template>
<script>
  import UsedlicenseItemProductItem from '@/components/UsedlicenseItemProductItem'
  export default {
    components: { UsedlicenseItemProductItem },
    props: ['licenceInfo'],
    /* data: () => ({
      licenceInfo: {'agentInfo': {}, 'licenceInfoList': {}}
    }) */
    computed: {
    }
  }
</script>
