<template>
  <div class="container">
    <div
      class="section"
      v-for="(question,i) of questionList"
      :key="i"
    >
      <span v-if="sport.testMode">部门:{{score_dept}},公司：{{score_company}}</span>
      <div class="section-item">
        <group
          v-if="typeof question.option!='undefined'"
          :title="`${i+1}.${question.title}`"
        >
          <radio
            :options="question.option"
            v-model="answerList[i]"
          ></radio>
        </group>
        <div v-else>
          <div class="weui-cells__title">{{i+1}}.{{question.title}}</div>
          <div
            v-if="question.title.indexOf('建议')>-1"
            class="rater-container"
          >
            <rater
              :min="1"
              :max="5"
              v-model="answerList[i]"
            />
            <label class="text">{{raterText[answerList[i]-1]}}</label>
          </div>
          <div v-else>
            <x-textarea
              v-model="answerList[i]"
              placeholder=" 可选填"
            ></x-textarea>
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
import { Toast, XTextarea, Group, Radio, Checklist, XButton, Rater } from "vux";

import { dateFormat } from "vux";

import { mapState } from "vuex";

import questionJSON from "../assets/data/harmoney";

import Tips from "../components/Tips.vue";
import util from "../lib/common";
import * as db from "../lib/db";
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
    Rater,
    XTextarea
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
      raterText: ["很不满意", "不太满意", "一般", "满意", "非常满意"],
      questionList
    };
  },
  computed: {
    ...mapState(["userInfo", "cdnUrl"]),
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
    tips: {
      get() {
        return this.$store.state.tips;
      },
      set(val) {
        this.$store.commit("setTips", val);
      }
    },
    score_dept() {
      let score = 0;
      for (let i = 10; i < this.questionList.length - 2; i++) {
        let curQuestion = this.answerList[i] || 0;
        if (this.questionList[i].option) {
          curQuestion = 0;
        }
        score += curQuestion;
      }
      return score;
    },
    score_company() {
      let score = 0;
      [3, 4, 5, 6, 9].forEach(i => {
        let curQuestion = this.answerList[i] || 0;
        if (this.questionList[i].option) {
          curQuestion = 0;
        }
        score += curQuestion;
      });
      return score;
    },
    // 对公司的建议
    suggest_company() {
      return this.answerList[32] || "";
    },
    // 对部门的建议
    suggest_dept() {
      return this.answerList[33] || "";
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
      // 最后2题不计是否答完
      for (let i = 0; flag && i < this.questionList.length - 2; i++) {
        let item = this.answerList[i];
        if (typeof item == "undefined") {
          flag = false;
        }
      }
      this.isCompleted = flag;
    },
    getSubmitData() {
      let arr = ["A", "B", "C", "D", "E"];
      let answer = this.answerList
        .slice(0, this.answerList.length - 2)
        .map((item, i) =>
          this.questionList[i].option ? arr[item] : arr[item - 1]
        )
        .join(",");
      this.sport.curScore = this.score_dept + this.score_company;

      return {
        start_time: this.startTime,
        rec_time: dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss"),
        score_dept: this.score_dept,
        score_company: this.score_company,
        suggest_company: this.suggest_company,
        suggest_dept: this.suggest_dept,
        uid: this.sport.uid,
        answer
      };
    },
    async submit() {
      let params = this.getSubmitData();
      let { data } = await db.addCbpcHarmoney(params);
      console.log(params);
      if (data[0].id > 0) {
        this.toast.show = true;
        this.toast.msg = "提交成功";
        this.sport.curTimes++;
        this.$router.push("info");
      }
    },

    prepareData() {
      document.title = this.sport.name + "微信答题活动";
      if (this.sport.uid == 0) {
        this.$router.push("/login");
      }
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
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    box-shadow: 0 0 6px 2px rgba(210, 199, 187, 0.2);
    background: #faf5f0;
    background-clip: padding-box;
    padding: 5px 0;
    box-sizing: border-box;
    .rater-container {
      padding: 0 15px 10px 15px;
      display: flex;
      align-items: center;
      .text {
        font-size: 16px;
        padding-left: 10px;
      }
    }
  }
}
.submit {
  margin-top: 10px;
}
</style>
