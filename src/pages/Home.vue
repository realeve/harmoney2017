<template>
  <div class="wrapper">
    <div class="content">
      <div class="margin-top-20 slogan">成都印钞有限公司</div>
      <p class="title margin-top-10">2021年成本月活动调查问卷</p>
      <div class="welcome margin-top-20">
        <p>2021年，已是公司成本月活动开展的第12个年头，在这12年中，广大职工积极为公司的成本管理工作建言献策，踊跃参加各项成本月活动，为公司的降本增效做出了巨大贡献。近年来公司钞纸产品变动成本在行业中名列前茅，印钞产品变动成本的行业排名也取得了显著提升，“可控成本降低额”指标连续两年获得满分，良好的财务指标凝聚了广大职工辛勤的汗水，在此我们表示深深的感谢！</p>
        <p>为进一步强化成本管理，持续推进降本增效、提质增效工作顺利开展，筑牢高质量发展根基，积极创建行业成本领先企业，同时积极响应总公司有关推进过紧日子工作要求，公司将开展主题为“过紧日子，提质增效”的成本管理月活动。</p>
        <p>
          在此，我们设计了一套问卷调查，想广泛了解广大职工对我们成本管理工作的看法并搜集宝贵意见，促使我们更好地开展工作。诚挚邀请公司全体在册职工本着实事求是的态度，花几分钟完成以下问卷调查，献上您宝贵的意见。
        </p>
        <p>
          同时，我们向广大职工发出倡议，过好“紧日子”，助力成钞的“好日子”。
        </p>
        <br />
        <p class="text-right">计划财务部<br />2021年8月</p>
      </div>
      <div class="line"></div>
      <div class="welcome margin-top-30">
        <p class="title margin-top-10">倡议书</p>
        <p>
         习近平总书记深刻指出：“过去我们党靠艰苦奋斗、勤俭节约不断成就伟业，现在我们仍然要用这样的思想来指导工作”“党和政府带头过紧日子，目的是为老百姓过好日子”。
        </p>
        <p>政府“过紧日子”坚守的是“节用裕民”的正道，公司“过紧日子”赢得的是“履方致远”的未来。着眼当前，我们肩负着高质量发展的重任，同时又面临行业形势严峻的重重挑战。在此，我们向全体职工发出倡议：要和衷共济，思想上再警醒，牢固树立“过紧日子”思想；要以身作则，作风上再严实，努力践行“提质增效”目标；要点滴做起，行动上再发力，为公司顺利实现公司高质量发展目标作出新的更大的贡献。</p>

        <!-- <p>（2）请认真对待每一道问题，确认无误后方可提交；</p>
        <p>（3）完成所有答题并显示提交成功后测评结束；</p>
        <p>（4）每人仅取一次答题数据，重复答题无效。</p>
        <p>
          （5）本次测评采用不记名问卷方式，我们将对您的信息严格保密，敬请放心。
        </p> -->
        
           <div class="tips">（本次调查采用不记名问卷方式，我们将对您的信息严格保密，敬请放心。）</div>
      </div>
      <div class="btn-wrapper margin-top-20">
        <x-button
          :disabled="isEnd"
          type="primary"
          @click.native="jump('login')"
          >{{ isEnd ? "活动已结束" : "登录" }}</x-button
        >
        <x-button @click.native="jump('chart')">查看汇总</x-button>
      </div>
    </div>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
    <v-foot />
  </div>
</template>
<script>
import { XButton, Toast, dateFormat } from "vux";

import { mapState } from "vuex";

export default {
  components: {
    XButton,
    Toast,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
      },
      showLoginfo: false,
      haveAnswerTimes: true,
    };
  },
  computed: {
    ...mapState(["cdnUrl"]),
    year() {
      let date = new Date();
      return date.getFullYear();
    },
    sport: {
      get() {
        return this.$store.state.sport;
      },
      set(val) {
        this.$store.commit("setSport", val);
      },
    },
    isEnd() {
      return (
        dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss") > "2021-8-25 23:59:59"
      );
    },
    // showBtn() {
    //   let username = this.sport.userName;
    //   let flag = false;
    //   let userList = ["李宾", "何苗", "唐晓琴"];
    //   userList.forEach(item => {
    //     if (item == username) {
    //       flag = true;
    //     }
    //   });
    //   return flag;
    // }
  },
  methods: {
    jump(router) {
      this.$router.push(router);
    },
  },
  mounted() {
    document.title = "2021年度公司成本月活动";
  },
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 13pt;
  width: 100%;
  justify-content: center;
  .title {
    font-size: 16pt;
    text-align: center;
    font-weight: bold;
  }
  .welcome {
    width: 80%;
    p {
      padding-top: 10px;
      text-indent: 2em;
      line-height: 1.5em;
      letter-spacing: 0.1em;
    }
    .text-right {
      text-align: right;
    }
    .tips{
      color: red;
    }

  }
  .btn-wrapper {
    width: 80%;
  }
  .line {
    height: 30px;
    border-bottom: 1px #ddd solid;
    width: 80%;
  }
}
</style>
