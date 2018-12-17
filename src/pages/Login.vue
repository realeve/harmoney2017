<template>
  <div class="wrapper">
    <group class="content">
      <x-input
        title="姓名"
        required
        name="userName"
        v-model="sport.userName"
        placeholder="点击此处输入姓名"
      ></x-input>
      <x-input
        title="密码"
        required
        :max="6"
        name="cardNo"
        v-model="sport.cardNo"
        placeholder="点击此处输入身份证后6位"
      ></x-input>
      <template v-if="sport.useDept">
        <x-input
          title="部门"
          required
          disabled
          name="dpt"
          v-model="sport.dpt[0]"
        ></x-input>
        <picker
          :data='dptList'
          v-model='sport.dpt'
        ></picker>
      </template>
      <div class="btn">
        <x-button
          :disabled="!shouldCommit"
          type="primary"
          @click.native="submit"
        >登录</x-button>
      </div>
    </group>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
    <v-foot />
  </div>
</template>
<script>
import { XButton, XInput, Group, Toast, Picker, GroupTitle } from "vux";

import { mapState } from "vuex";
import * as db from "../lib/db";
const R = require("ramda");

export default {
  components: {
    XButton,
    XInput,
    Group,
    Toast,
    GroupTitle,
    Picker
  },
  data() {
    return {
      toast: {
        show: false,
        msg: ""
      },
      dptList: []
    };
  },
  computed: {
    ...mapState(["cdnUrl"]),
    shouldCommit() {
      return (
        this.sport.userName != "" &&
        this.sport.cardNo != "" &&
        (this.sport.useDept ? this.sport.dpt[0] != "" : true)
      );
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
    async init() {
      let { data: depts } = await db.getCbpcHarmoneyUserlistDepts();
      this.dptList = R.flatten(depts);

      this.loadUserInfo();
    },
    loadUserInfo() {
      let userInfo = localStorage.getItem("userInfoHarmoney_2018");
      if (userInfo == null) {
        return;
      }
      userInfo = JSON.parse(userInfo);

      this.sport = {
        userName: userInfo.username,
        cardNo: userInfo.psw,
        dpt: [userInfo.dept]
      };
    },
    submit: async function() {
      let params = {
        username: this.sport.userName,
        psw: this.sport.cardNo,
        dept: this.sport.dpt[0],
        s: "/addon/Api/Api/login"
      };
      let uid = await this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          let obj = res.data[0];
          if (typeof obj == "undefined") {
            obj = { id: 0 };
          }
          return obj.id;
        });
      // console.log(uid);

      // 卡号或部门输入错误
      if (uid == 0) {
        this.toast.show = true;
        this.toast.msg = "登录失败";
        return;
      }

      params = {
        uid,
        sid: this.sport.id,
        s: "/addon/Api/Api/getHarmoneyPaper"
      };
      let times = await this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          let obj = res.data;
          return obj[0].num;
        });

      if (times >= this.sport.maxTimes) {
        this.toast.show = true;
        this.toast.msg = "答题次数用完";
        this.jump("info");
        return;
      }

      // 登录成功
      this.sport.isLogin = true;
      this.sport.curTimes = parseInt(times) + 1;

      params = {
        username: this.sport.userName,
        psw: this.sport.cardNo,
        dept: this.sport.dpt[0],
        uid
      };

      var userInfo = JSON.stringify(params);
      this.sport.uid = uid;
      // this.sport.curScore = obj.score;
      localStorage.setItem("userInfoHarmoney", userInfo);
      this.jump("paper");
    }
  },
  mounted() {
    document.title = "登录";
    this.init();
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  font-size: 13pt;
  color: #233;
  width: 100%;
  justify-content: center;
  .title {
    font-size: 22pt;
  }
}

.btn {
  width: 80%;
  margin: 60px auto;
}
</style>
