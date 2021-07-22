<template>
  <div class="container">
    <div class="section" v-for="(question, i) of questionList" :key="i">
      <span v-if="sport.testMode"
        >部门:{{ score_dept }},公司：{{ score_company }}</span
      >
      <div class="section-item">
        <group v-if="question.option" :title="`${i + 1}.${question.title}`">
          <template v-if="question.type === 'single'">
            <radio :options="question.option" v-model="answerList[i]"></radio>
          </template>
          <template v-if="question.type === 'multi'">
            <checklist
              label-position="left"
              :options="question.option"
              v-model="answerList[i]"
            ></checklist>
          </template>
          <template v-if="question.type === 'next'">
            <radio :options="question.option" v-model="answerList[i]"></radio>
            <group v-show="answerList[i] == ['1']" :title="`${question.title_next}`">
              <checklist
                label-position="left"
                :options="question.option_next"
                v-model="answerList[i + 1]"
              ></checklist>
            </group>
          </template>
        </group>

        <div v-else>
          <div class="weui-cells__title">{{ i + 1 }}.{{ question.title }}</div>
          <div v-if="i > 17" class="rater-container">
            <rater :min="1" :max="5" v-model="answerList[i]" />
            <label class="text">{{ raterText[answerList[i] - 1] }}</label>
          </div>
          <div v-else>
            <x-textarea
              v-model="answerList[i]"
              :placeholder="question.placeholder"
              :rows="6"
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
      >提交</x-button
    >
    <toast v-model="toast.show">{{ toast.msg }}</toast>
  </div>
</template>
<script>
import { Toast, XTextarea, Group, Radio, Checklist, XButton, Rater } from "vux";

import { dateFormat } from "vux";

import { mapState } from "vuex";

import questionJSON from "../assets/data/costPaper2021";

import Tips from "../components/Tips.vue";
import util from "../lib/common";
import * as db from "../lib/db";
let questionList = util.getHarmoney(questionJSON);

let filterQuestions = [0, 1, 2, 3, 4, 9, 13, 14, 28];

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
    XTextarea,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
      },
      answerList: [],
      isCompleted: false,
      startTime: dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss"),
      raterText: ["很不满意", "不太满意", "一般", "满意", "非常满意"],
      questionList,
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
      },
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
      },
    },
    score_dept() {
      return 0;
      // let score = 0;
      // for (let i = 10; i < this.questionList.length - 2; i++) {
      //   let curQuestion = this.answerList[i] || 0;
      //   if (this.questionList[i].option) {
      //     curQuestion = 0;
      //   }
      //   score += curQuestion;
      // }
      // return score;
    },
    score_company() {
      let score = 0;
      this.answerList.forEach((item, i) => {
        if (filterQuestions.includes(i)) {
          return;
        }
        let curQuestion = item || 0;
        score += curQuestion;
      });
      return score;

      // [3, 4, 5, 6, 9].forEach((i) => {
      //   let curQuestion = this.answerList[i] || 0;
      //   if (this.questionList[i].option) {
      //     curQuestion = 0;
      //   }
      //   score += curQuestion;
      // });
      // return score;
    },
    // 对公司的建议
    suggest_company() {
      return this.answerList[16] || "";
    },
    // 对部门的建议
    suggest_dept() {
      return this.answerList[17] || "";
    },
  },
  watch: {
    answerList(val) {
      this.getCompleteStatus();
    },
  },
  methods: {
    getCompleteStatus() {
      let flag = true;
      // 必须全部作答
      for (let i = 0; flag && i < this.questionList.length; i++) {
        // if (i == 13 || i == 28) {
        //   break;
        // }
        let item = this.answerList[i];
        if (typeof item == "undefined") {
          flag = false;
        }
      }
      this.isCompleted = flag;
    },
    getSubmitData() {
      let arr = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
      ];

      let answer = this.answerList
        .map((item, i) => {
          if (this.questionList[i].type === "single") {
            return arr[item];
          }
          if (this.questionList[i].type === "multi") {
            return item.map((item_inner) => arr[item_inner]).join("-");
          }
          if (this.questionList[i].type === "next") {
            return null;
          }
          if (this.questionList[i].type === "text") {
            return null;
          }
        })
        .join(",");
      this.sport.curScore = this.score_dept + this.score_company;

      return {
        start_time: this.startTime,
        rec_time: dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss"),
        score_dept: 0,
        score_company: 0,
        suggest_company: this.suggest_company,
        suggest_dept: this.suggest_dept,
        uid: this.sport.uid,
        answer,
      };
    },
    async submit() {
      let params = this.getSubmitData();
      console.log(params);
      let { data } = await db.addCbpcHarmoney(params);

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
    },
  },
  mounted() {
    this.prepareData();
  },
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
