<template>
  <div class="wrapper">
    <div class="content">
      <div class="margin-top-20 slogan"></div>
      <p class="title margin-top-10">“坚持对标 规范管理”专项监督工作</p>
      <p class="title margin-top-10">问卷调查（满意度问卷）</p>
      <div class="welcome margin-top-20">
        <p>为认真贯彻落实全面从严治党、从严治企和“严字当头，规范管理”总要求，坚持以人民为中心的思想，梳理与职工切身利益相关的事项，对标管理制度、标准和相关要求开展专项监督工作，针对选择性执行、对人不对事（感情用事）等不公正情况及时纠偏，根据公司“坚持对标 规范管理”专项监督工作方案安排，组织开展“坚持对标 规范管理”专项监督工作问卷调查，共25道单项选择题和1项开放式填空题。本问卷为涉及职工切实利益相关事项“公平公正公开”满意度调查，仅作为基本情况了解掌握所用，请秉持实事求是、不夸大不捏造原则如实填写问卷，我们将对您填写的内容严格保密，感谢您对本次问卷调查工作的支持与理解！</p>
       
        <br />
        <p class="text-right">纪检监察办公室、内部审计部<br />2021年9月</p>
      </div>
      <div class="line"></div>
      <div class="welcome margin-top-30">
        <!-- <p class="title margin-top-10">倡议书</p> -->
       
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
    document.title = "2021年度“坚持对标 规范管理”专项监督工作问卷调查";
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
