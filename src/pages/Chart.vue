<template>
  <div class="wrapper">
    <div class="content">
      <p class="title margin-top-20">2017年度和谐企业创建<br>二级单位员工满意度测评问卷</p>

    </div>
    <v-foot/>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
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
    loadPapers() {
      let params = {
        sportid: this.sport.id,
        s: "/addon/Api/Api/countHarmoney"
      };

      if (
        this.sport.userName == "" ||
        this.sport.cardNo == "" ||
        this.sport.dpt[0] == ""
      ) {
        return;
      }
      this.$http.jsonp(this.cdnUrl, {
        params
      });
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
  }
}
</style>
