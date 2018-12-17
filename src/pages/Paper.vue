<template>
  <div class="container">
    <div
      class="section"
      v-for="(question,i) of questionList"
      :key="i"
    >
      <span v-if="sport.testMode">得分:{{subScore}}</span>
      <div class="section-item">
        <group
          v-if="i<3"
          :title="`${i+1}.${question.title}`"
        >
          <radio
            :options="question.option"
            v-model="answerList[i]"
          ></radio>
        </group>
        <div v-else>
          <div class="weui-cells__title">{{i+1}}.{{question.title}}</div>
          <div class="rater-container">
            <rater
              :min="1"
              :max="5"
              v-model="answerList[i]"
            />
            <label class="bold">{{raterText[answerList[i]-1]}}</label>
          </div>
        </div>
      </div>
    </div>
    <x-button
      :disabled="!isCompleted"
      type="primary"
      @click.native="submit()"
      class="submit"
    >提交</x-button>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
  </div>
</template>
<script>
// import "fullpage.js";
// import $ from "fullpage.js/node_modules/jquery";

import { Toast, Group, Radio, Checklist, XButton, Rater } from "vux";

import { dateFormat } from "vux";

import { mapState } from "vuex";

import questionJSON from "../assets/data/harmoney.json";

import Tips from "../components/Tips.vue";
import util from "../lib/common";
let questionList = util.getHarmoney(questionJSON);

export default {
  name: "page",
  components: {
    Toast,
    Group,
    Radio,
    Checklist,
    XButton,
    Tips,
    Rater
  },
  data() {
    return {
      toast: {
        show: false,
        msg: ""
      },
      answerList: [],
      isCompleted: false,
      startTime: dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss"),
      raterText: ["很不满意", "", "", "", "很满意"]
    };
  },
  computed: {
    ...mapState(["userInfo", "cdnUrl"]),
    questionList() {
      return questionList.slice(0, this.sport.questionNums);
    },
    sport: {
      get() {
        return this.$store.state.sport;
      },
      set(val) {
        this.$store.commit("setSport", val);
      }
    },
    url() {
      return window.location.href.split("#")[0];
    },
    el() {
      return $(this.$refs.fp);
    },
    tips: {
      get() {
        return this.$store.state.tips;
      },
      set(val) {
        this.$store.commit("setTips", val);
      }
    },
    paperInit: {
      get() {
        return this.$store.state.paperInit;
      },
      set(val) {
        this.$store.commit("setPaperInit", val);
      }
    },
    subScore() {
      let score = 0;

      this.answerList.forEach((item, i) => {
        let curQuestion = this.questionList[i];
        if (i > 2) {
          score += item + 1;
        }
      });
      return score;
    }
  },
  watch: {
    answerList(val) {
      this.getCompleteStatus();
    }
  },
  methods: {
    getCompleteStatus() {
      let flag = true;
      for (let i = 0; flag && i < this.answerList.length; i++) {
        let item = this.answerList[i];
        if (item == -1) {
          flag = false;
        }
      }
      this.isCompleted = flag;
    },
    getSubmitData() {
      let arr = ["A", "B", "C", "D", "E"];
      let answer = this.answerList.map(item => arr[item]).join(",");
      this.sport.curScore = this.subScore;
      return {
        start_time: this.startTime,
        rec_time: dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss"),
        score: this.subScore,
        sid: this.sport.id,
        uid: this.sport.uid,
        answer
      };
    },
    setCurIdx(slideIdx) {
      let slideNum = this.questionList.length;
      this.tips = slideNum > 1 ? `${slideIdx}/${slideNum}` : "";
    },
    submit() {
      let params = this.getSubmitData();
      params.s = "/addon/Api/Api/submitHarmoney";

      this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          this.toast.show = true;
          this.toast.msg = res.data.msg;
          this.sport.curTimes++;
          this.$router.push("info");
        });
    },

    prepareData() {
      document.title = this.sport.name + "微信答题活动";
      let answers = this.questionList.map(item => -1);
      for (let i = 3; i < answers.length; i++) {
        // 初始置为3颗星
        answers[i] = 3;
      }

      this.answerList = answers;
    }
  },
  mounted() {
    this.prepareData();
  }
};
</script>
<style scoped lang="less">
@import "../assets/css/weui.css";
.container {
  padding: 20px 10px;
  width: 100%;
}
.section {
  margin: 0;
  padding: 8px;
  color: #785a32;
  background: #fff;
  text-align: left;
  &-item {
    border: 1px solid #d2c7bb;
    border-radius: 5px;
    box-shadow: 0 0 6px 2px rgba(210, 199, 187, 0.2);
    background: #faf5f0;
    background-clip: padding-box;
    padding: 5px 0;
    box-sizing: border-box;
    .rater-container {
      padding: 0 15px 10px 15px;
    }
  }
}
</style>
