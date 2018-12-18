<template>
  <div
    class="chart"
    ref="chart"
    :style="{height}"
  ></div>
</template>
<script>
import echarts from "echarts";
let color = [
  "#61A5E8",
  "#7ECF51",
  "#E16757",
  "#9570E5",
  "#605FF0",
  "#85ca36",
  "#1c9925",
  "#0d8b5f",
  "#0f9cd3",
  "#2f7e9b",
  "#2f677d",
  "#9b7fed",
  "#7453d6",
  "#3b1d98",
  "#27abb1",
  "#017377",
  "#015f63",
  "#b86868",
  "#5669b7",
  "#e5aab4",
  "#60b65f",
  "#98d2b2",
  "#c9c8bc",
  "#45c3dc",
  "#e17979",
  "#5baa5a",
  "#eaccc2",
  "#ffaa74"
];
export default {
  props: ["data", "height"],
  data() {
    return {
      isBar: false
    };
  },
  computed: {
    chartData() {
      return this.data;
    }
  },
  watch: {
    chartData() {
      this.initChart();
    }
  },
  methods: {
    getOption(data) {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color,
        series: [
          {
            type: "pie",
            radius: ["40%", "55%"],
            startAngle: 45,
            data: data.filter(item => item.value > 0),
            label: {
              normal: {
                formatter: function(param) {
                  return (
                    param.name.replace("(", "\n(") +
                    "\n(" +
                    param.percent.toFixed(2) +
                    "%)\n" +
                    param.value +
                    "人"
                  );
                }
              }
            }
          }
        ]
      };
    },
    getBarOption(data) {
      return {
        tooltip: {
          trigger: "item"
        },
        grid: {
          x: 120
        },
        xAxis: {
          type: "value",
          show: false,
          min: 0,
          max: 100
        },
        yAxis: {
          type: "category",
          data: data.map(item => item.name)
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: a =>
                  `${a.value}%(${this.data[a.dataIndex].curNum}人)`
              }
            },
            data
          }
        ]
      };
    },
    initChart() {
      let option;
      if (this.chartData.length > 10) {
        this.isBar = true;
        option = this.getBarOption(this.chartData);
      } else {
        option = this.getOption(this.chartData);
      }
      let chart = echarts.init(this.$refs.chart);
      chart.setOption(option);
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
}
</style>

