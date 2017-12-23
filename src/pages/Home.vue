<template>
  <div class="wrapper">
    <div class="content">
      <p class="slogan">成都印钞有限公司</p>
      <p class="title margin-top-20">2017年度和谐企业创建<br>二级单位员工满意度测评问卷</p>
      <div class="welcome margin-top-20">
        <p>成都印钞有限公司和谐企业创建离不开广大职工的积极参与和支持。公司和谐企业创建工作开展满意度测评的主旨，是通过抽样问卷的形式了解职工对公司和部门和谐企业创建工作进程中的想法和建议，以便于发现创建过程中存在的问题、分析原因并探索改进方向。</p>
        <p>本次测评采用不记名问卷方式，企业文化部将对您提交的问卷严格保密。</p>
        <p>您每一个认真的回答，我们都会给予高度重视。感谢您的参与和支持。</p>
        <p class="text-right">党委宣传部（企业文化部）</p>
      </div>
      <div class="btn-wrapper margin-top-20">
        <x-button type="primary" @click.native="jump('login')">登录</x-button>
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
    }
  },
  methods: {
    jump(router) {
      this.$router.push(router);
    },
    loadUserInfo() {
      let userInfo = localStorage.getItem("userInfoHarmoney");
      if (userInfo == null) {
        return;
      }
      userInfo = JSON.parse(userInfo);

      this.sport = {
        userName: userInfo.username,
        cardNo: userInfo.psw,
        dpt: [userInfo.dept]
      };
      this.login();
    },
    login() {
      let params = {
        username: this.sport.userName,
        psw: this.sport.cardNo,
        dept: this.sport.dpt[0],
        s: "/addon/Api/Api/login"
      };

      if (
        this.sport.userName == "" ||
        this.sport.cardNo == "" ||
        this.sport.dpt[0] == ""
      ) {
        return;
      }
      this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          let obj = res.data[0];
          // 卡号或部门输入错误

          if (typeof obj == "undefined") {
            return;
          }

          this.sport.uid = obj.id;
          this.toast.show = true;
          this.toast.msg = "答题次数用完";
          this.haveAnswerTimes = false;
          this.jump("info");

          // 登录成功
          // this.sport.isLogin = true;
          // this.sport.curTimes = parseInt(obj.answer_times) + 1;
          // this.showLoginfo = true;
        });
    }
  },
  mounted() {
    this.loadUserInfo();
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
  }
  .welcome {
    width: 80%;
    p {
      padding-top: 10px;
      padding-bottom: 10px;
      text-indent: 2.2em;
      line-height: 2em;
      letter-spacing: 0.1em;
    }
    .text-right {
      text-align: right;
    }
  }
  .btn-wrapper {
    width: 80%;
  }
}
</style>
