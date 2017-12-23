<template>
  <div class="home">
    <div class="content">
      <msg :title="title" :description="desc" :icon="icon"></msg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "success",
      desc: `感谢您对本次活动的大力支持`,
      title: "感谢参与"
    };
  },
  mounted() {
    document.title = "感谢您对本次活动的大力支持.";
  }
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
  }
}
</style>
