<template>
  <div class="wrapper">
    <div class="content">
      <div class="margin-top-20 slogan">成都印钞有限公司</div>
      <p class="title margin-top-60">2017年度和谐企业创建<br>二级单位员工满意度测评问卷</p>
      <div class="welcome margin-top-20">
        <p>成都印钞有限公司和谐企业创建离不开广大职工的积极参与和支持。公司和谐企业创建工作开展满意度测评的主旨，是通过抽样问卷的形式了解职工对公司和部门和谐企业创建工作进程中的想法和建议，以便于发现创建过程中存在的问题、分析原因并探索改进方向。</p>
        <p>本次测评采用不记名问卷方式，和谐创建办将对您提交的问卷严格保密。</p>
        <p>您每一个认真的回答，我们都会给予高度重视。感谢您的参与和支持。</p>
        <p class="text-right">和谐企业创建办公室<br>2017年12月25日</p>
      </div>
      <div class="line"></div>
      <div class="welcome margin-top-30">
        <p>本次员工满意度测评对象为公司全体在册员工(含多元用工)。请阅读测评需知后进入问卷：</p>
        <p>
          （1）本次测评开放时间截止到2017年12月27日24:00；</p>
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
        <x-button type="primary" @click.native="jump('login')">登录</x-button>
        <x-button @click.native="jump('chart')">查看汇总</x-button>
      </div>
    </div>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
    <v-foot/>
  </div>
</template>
<script>
import { XButton, Toast } from "vux";

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
    showBtn() {
      let username = this.sport.userName;
      let flag = false;
      let userList = ["李宾", "何苗", "尹放", "时延风", "唐晓琴"];
      userList.forEach(item => {
        if (item == username) {
          flag = true;
        }
      });
      return flag;
    }
  },
  methods: {
    jump(router) {
      this.$router.push(router);
    }
  },
  mounted() {
    document.title = "2017年度和谐企业创建";
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
