<template>
    <div class="header clearfloat">
        <div class="logo-box fl"></div>
        <div class="conmpany-name conmpany-dropbottom fl" id="org_current_name" @click="changeShowOrgList">
            <span :title="defaultOrg">{{defaultOrg}}</span>
            <div class="conmpany-pop" v-show="showOrgList"  id="org_select_items"><div class="company-name-ul">


                <div @click="changeOrg(option.orgId)" v-for="option in orgList"  class="conmpany-text clearfloat jq-conmpany-text" :data-orgid="option.orgId">
                    <div class="fl company-title  jq-company-title" :title="option.orgFullName">{{option.orgFullName}}</div>
                </div>


            </div>
                <div class="add-company ">
                    <a href="#">
                        <span class="icon-cjt_icon_newadd add-company-img fl"></span>
                        <span class="fl">新建企业</span>
                    </a>
                </div></div>
        </div>

        <div class="user fr  jq-header-common">
            <img src="https://sto.chanapp.chanjet.com/90001660099/cia/headpicture/2017/05/18/33b64b57-1071-49f4-af3f-3e0626cbf1bc61639307.jpgcut.jpg" width="100%" alt="" onerror="this.src='/release/imgs/s09.jpg'">
            <div class="user-pop">
                <ul>
                    <li><a href="//inte-passport.chanjet.com/password/revisePassword" target="_blank"><span class="user-pop-img icon-icon_edit fl"></span><span class="fl">修改密码</span></a></li>
                    <li><a href="#" id="header_logout"><span class="user-pop-img icon-icon_quit fl"></span><span class="fl">退出登录</span></a></li>
                </ul>
            </div>
        </div><!--user-->

        <div class="header-other fr clearfloat">
            <div class="work-store fz12 fl">
                <a href="//inte-workbench.chanjet.com">
                    <span class="icon-icon_manage_n fl"></span>
                    <span class="fl">管理后台</span>
                </a>
            </div>
            <div class="style-line fl"></div>
            <a href="http://service.chanjet.com/zx"><div class="help-box fl icon-icon_help_n" title="服务社区">

            </div></a>
            <div class="download-wap fl">
                <div class="icon-icon_mobile_n" title="下载工作圈客户端">  </div>

                <div class="phone-pop  qrcode-pop"><!--手机二维码图片的弹出层已隐藏-->
                    <img src="/release/imgs/qr_code.jpg" width="100%" alt="">

                    <p class="fz12">iPhone&amp;Android</p>
                </div>


            </div>
        </div><!--header-other-->

    </div>
</template>
<script>
  import examService from '@/services/examService'
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  import {updateUrlParameter} from '@/shared/utils/mixins'
  export default {
    mixins: [sharedStateMixin],
    props: ['shouldPayPrice', 'originPrice'],
    data: () => ({
      showOrgList: false,
      orgIdNameMap: {},
      orgList: []
    }),
    computed: {
      discount: function () {
        return this.originPrice - this.shouldPayPrice
      },
      defaultOrg: function () {
        let defaultOrg2 = this.sharedState.defaultOrg.orgFullName
        return defaultOrg2;
      }
    },
    methods: {
      changeShowOrgList: function () {
        this.showOrgList = !this.showOrgList;
      },
      changeOrg: function (orgid) {
        this.sharedState.defaultOrg = this.orgIdNameMap[orgid]
        let currHref = location.href;
        location.href = updateUrlParameter(currHref, 'orgId', orgid);
        return
      }
    },
    created () {
      examService.orgList().then(orgList => {
//        orgList[0].orgName = orgList[0].orgName.replace(/&lt;/,'<')
        this.orgList = orgList
        this.orgList.map((item2,index) => {
//          console.log('index', index)
//          console.log('item2', item2)
          this.orgIdNameMap[item2.orgId] = item2;
          if (item2.defaultSelect == '1') {
            this.sharedState.defaultOrg = item2;
//            defaultOrg2 = item2.orgFullName
//            return
          }
        });
      })
    },
    filters: {
      capitalize: function (value) {
      }
    }
  }
</script>
