<template>
  <div class="wrapper">
    <div class="content">
      <p class="title margin-top-20">
        2021年度公司成本月活动<br />2021年廉政月活动调查问卷
      </p>
      <p class="margin-top-20 tips">
        截止至 {{ now }} ,本次活动共有{{
          this.papers.length
        }}人参与测评，统计结果如下：
      </p>
      <div class="card" v-for="(item, i) of chartData" :key="i">
        <div class="content">
          <div>{{ i }}.{{ item.title }}</div>
          <v-chart
            :data="item.data"
            :height="(i == 0 ? 800 : 250) + 'px'"
          ></v-chart>
        </div>
      </div>
    </div>
    <v-foot />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { dateFormat } from "vux";
// import questionsJSON from "../assets/data/costPaper2021";
import questionsJSON from "../assets/data/incorruptPaper2021";
import VChart from "../components/Chart";
import * as db from "../lib/db";
export default {
  components: {
    VChart,
  },
  data() {
    return {
      papers: [],
      depts: [],
      now: dateFormat(new Date(), "YYYY-MM-DD HH:mm"),
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
      },
    },
    chartData() {
      let data = [
        {
          title: "各部门参与比例如下:",
          data: this.depts,
        },
        // {
        //   title: "性别构成：",
        //   data: [
        //     {
        //       name: "男",
        //       value: 0,
        //     },
        //     {
        //       name: "女",
        //       value: 0,
        //     },
        //   ],
        // },
        // {
        //   title: "年龄构成：",
        //   data: [
        //     {
        //       name: "30岁以下",
        //       value: 0,
        //     },
        //     {
        //       name: "30-35岁",
        //       value: 0,
        //     },
        //     {
        //       name: "36-40岁",
        //       value: 0,
        //     },
        //     {
        //       name: "41-50岁",
        //       value: 0,
        //     },
        //     {
        //       name: "50岁以上",
        //       value: 0,
        //     },
        //   ],
        // },
      ];
      questionsJSON
        // .filter((item, i) => ![16, 17].includes(i))
         .filter((item, i) => ![25].includes(i))
        .forEach((item, i) => {
          console.log(item, i)
          item.option = item.option || [
            "很不满意",
            "不太满意",
            "一般",
            "满意",
            "非常满意",
          ];
          let obj = {
            title: item.title,
            data: item.option.map((name) => ({
              name: name,
              value: 0,
            })),
          };
          data.push(obj);
        });
      let obj_next = {
        title: questionsJSON[24].title,
        data: questionsJSON[24].option.map((name) => ({
          name: name.substring(2),
          value: 0,
        })),
      };
      data.push(obj_next);

      this.papers.map((item, i) => {
        // // 性别
        // if (item.sex == "男") {
        //   data[1].data[0].value++;
        // } else {
        //   data[1].data[1].value++;
        // }
        // // 年龄
        // const age = parseInt(item.age);
        // if (age < 30) {
        //   data[2].data[0].value++;
        // } else if (age < 35) {
        //   data[2].data[1].value++;
        // } else if (age < 40) {
        //   data[2].data[2].value++;
        // } else if (age < 50) {
        //   data[2].data[3].value++;
        // } else {
        //   data[2].data[4].value++;
        // }
        // 其它数据
        const answers = item.answer.split(",");
        //console.log("answers", answers);
        answers.forEach((answer, idx) => {
          if (answer.length == 1) {
            let code = answer.charCodeAt() - 65;
            if (answers.length == 26 && idx == 25) {
              // 两步选项题型_选项记数
              if (typeof data[24].data[code] != "undefined") {
                data[24].data[code].value++;
              }
            } else {
              // 选项记数
              if (typeof data[idx + 1].data[code] != "undefined") {
                data[idx + 1].data[code].value++;
              }
            }
          }
          if (answer.length > 1) {
            let multi_answers = answer.split("-");
            multi_answers.forEach((multi_answer, index) => {
              let code = multi_answer.charCodeAt() - 65;
              if (answers.length == 26 && idx == 25) {
                // 两步选项题型_选项记数
                if (typeof data[24].data[code] != "undefined") {
                  data[24].data[code].value++;
                }
              } else {
                // 选项记数
                if (typeof data[idx + 1].data[code] != "undefined") {
                  data[idx + 1].data[code].value++;
                }
              }
            });
          }
        });
      });
      //console.log("data", data);
      return data;
    },
  },
  methods: {
    async loadPapers() {
      this.papers = await db.getCbpcHarmoney().then((res) => res.data);
      // 各部门参与情况
      this.depts = await db.getCbpcHarmoneyDept().then(({ data }) =>
        data.map((item, i) => {
          if (item.name.indexOf("（") > -1) {
            item.name = item.name.split("（")[0];
          }
          // if (item.name.includes("公司")) {
          //   switch (item.name) {
          //     case "中钞金服科技有限公司":
          //       item.name = "中钞金服";
          //       break;
          //     case "中钞长城贵金属有限公司":
          //       item.name = "长城公司";
          //       break;
          //     case "成都金鼎安全印制有限责任公司":
          //       item.name = "金鼎公司";
          //       break;
          //     case "成钞物业管理有限公司":
          //       item.name = "物业公司";
          //       break;
          //   }
          // }
          item.name = `${data.length - i}.${item.name}`;
          return item;
        })
      );
    },
  },
  mounted() {
    document.title = "2021年廉政月活动调查问卷";
    this.loadPapers();
  },
};
</script>
<style lang="less" scoped>
.content {
  margin: 0 auto;
  padding: 10px;
  color: #444;
  background: #fff;
  width: 100%;
  .title {
    font-size: 16pt;
    text-align: center;
  }
  .card {
    margin: 10px 5px;
  }
  .tips {
    text-indent: 2em;
  }
}
</style>
