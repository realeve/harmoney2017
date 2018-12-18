<template>
  <div class="wrapper">
    <div class="content">
      <div class="margin-top-20 slogan">成都印钞有限公司</div>
      <p class="title margin-top-10">2018年度员工满意度测评问卷</p>
      <div class="welcome margin-top-20">
        <p>您好！</p>
        <p>欢迎参加成都印钞有限公司2018年度员工满意度测评。</p>
        <p>此次调查重点为倾听员工心声，了解员工需求，发现公司和谐创建中存在的问题，旨在持续创造适应员工发展的企业文化，提升公司管理水平，营造“文明成钞我创建 和谐成钞我幸福”的良好工作氛围。</p>
        <p>希望您能抽出一点时间，积极配合本次测评工作。您的每一个认真回答，我们都将给予高度重视。感谢您的热情参与。</p>
        <p>说明：本次测评采用不记名问卷方式，公司将对您的信息严格保密，敬请放心。</p>
        <p class="text-right">党委宣传部（企业文化部）<br>2018年12月</p>
      </div>
      <div class="line"></div>
      <div class="welcome margin-top-30">
        <p>本次员工满意度测评对象为公司全体在册员工(含多元用工)。请阅读测评需知后进入问卷：</p>
        <p>
          （1）本次测评开放时间截止到2018年12月27日24:00；</p>
        <p>
          （2）参与人员需输入真实姓名、部门和身份证后六位方可进入答题；</p>
        <p>
          （3）请认真对待每一道问题，确认无误后方可提交；</p>
        <p>
          （4）完成所有答题并显示提交成功后测评结束；</p>
        <p>
          （5）每人仅取一次答题数据，重复答题无效。</p>
      </div>
      <div class="btn-wrapper margin-top-20">
        <x-button
          :disabled="isEnd"
          type="primary"
          @click.native="jump('login')"
        >{{isEnd ? "活动已结束" : "登录"}}</x-button>
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
    Toast
  },
  data() {
    return {
      toast: {
        show: false,
        msg: ""
      },
      showLoginfo: false,
      haveAnswerTimes: true
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
      }
    },
    isEnd() {
      return (
        dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss") > "2018-12-21 23:59:59"
      );
    }
    // showBtn() {
    //   let username = this.sport.userName;
    //   let flag = false;
    //   let userList = ["李宾", "何苗", "尹放", "时延风", "唐晓琴"];
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
    }
  },
  mounted() {
    document.title = "2018年度和谐企业创建";
  }
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
