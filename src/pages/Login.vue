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
        title="卡号"
        required
        :max="6"
        name="cardNo"
        v-model="sport.cardNo"
        placeholder="点击此处输入工作牌号"
      ></x-input>
      <template v-if="sport.useDept">
        <x-input
          title="部门"
          required
          disabled
          name="dpt"
          v-model="sport.dpt[0]"
        ></x-input>
        <picker :data="dptList" v-model="sport.dpt"></picker>
      </template>
      <div class="btn">
        <x-button
          :disabled="!shouldCommit || isEnd"
          type="primary"
          @click.native="submit"
          >{{ isEnd ? "活动已结束" : "登录" }}</x-button
        >
      </div>
    </group>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
    <v-foot />
  </div>
</template>
<script>
import {
  XButton,
  XInput,
  Group,
  Toast,
  Picker,
  GroupTitle,
  dateFormat,
} from "vux";

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
    Picker,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
      },
      dptList: [],
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
      },
    },
    isEnd() {
      return (
        dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss") > "2021-8-25 23:59:59"
      );
    },
  },
  methods: {
    jump(router) {
      this.$router.push(router);
    },
    async init() {
      let depts = await db.getCbpcHarmoneyUserlistDepts();
      this.dptList = [R.flatten(depts)];
      this.loadUserInfo();
    },
    loadUserInfo() {
      let userInfo = localStorage.getItem("userInfoHarmoney2020");
      if (userInfo == null) {
        return;
      }
      userInfo = JSON.parse(userInfo);

      this.sport = {
        userName: userInfo.username,
        cardNo: userInfo.psw,
        dpt: [userInfo.dept],
      };
    },
    submit: async function () {
      let { data, rows } = await db.getCbpcHarmoneyUserlist({
        dept: this.sport.dpt[0],
        username: this.sport.userName,
        id_card: this.sport.cardNo.toUpperCase(),
      });

      // 卡号或部门输入错误
      if (rows == 0) {
        this.toast.show = true;
        this.toast.msg = "登录失败";
        return;
      }
      let [{ uid, hid }] = data;

      if (hid > 0 || rows > 1) {
        this.toast.show = true;
        this.toast.msg = "答题次数用完";
        this.jump("info");
        return;
      }

      // 登录成功
      this.sport.isLogin = true;
      this.sport.curTimes = 1;

      let params = {
        username: this.sport.userName,
        psw: this.sport.cardNo,
        dept: this.sport.dpt[0],
        uid,
      };

      var userInfo = JSON.stringify(params);
      this.sport.uid = uid;
      // this.sport.curScore = obj.score;
      localStorage.setItem("userInfoHarmoney2020", userInfo);
      this.jump("paper");
    },
  },
  mounted() {
    document.title = "登录";
    this.init();
  },
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
