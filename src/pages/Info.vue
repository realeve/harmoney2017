<template>
  <div class="home">
    <div class="content">
      <msg :title="title" :description="desc" :icon="icon"></msg>
      <div class="btn-wrapper margin-top-20">
        <x-button type="primary" @click.native="jump('chart')"
          >查看汇总</x-button
        >
      </div>
    </div>
    <v-foot />
  </div>
</template>

<script>
import { XButton, Msg } from "vux";
export default {
  components: {
    XButton,
    Msg,
  },
  data() {
    return {
      icon: "success",
      desc: `感谢您对本次活动的大力支持`,
      title: "感谢参与",
    };
  },
  computed: {
    sport: {
      get() {
        return this.$store.state.sport;
      },
      set(val) {
        this.$store.commit("setSport", val);
      },
    },
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
  },
  mounted() {
    this.loadUserInfo();
  },
};
</script>

<style scoped lang="less">
.home {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  font-weight: 100;
  .content {
    flex: 1;
    margin: 0 auto;
    width: 80%;
    .btn-wrapper {
      width: 100%;
    }
  }
}
</style>
