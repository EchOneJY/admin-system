<template>
  <el-card class="number-card" shadow="hover">
    <i class="icon" :class="card.icon" :style="{ color: card.color }"></i>
    <div class="content">
      <p class="title">{{ card.title }}</p>
      <p class="number">
        <count-to
          :start-val="0"
          :end-val="card.number"
          :duration="card.duration"
          class="card-panel-num"
        ></count-to>
      </p>
    </div>
  </el-card>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  props: {
    card: {
      type: Object,
      default() {
        return {
          icon: '',
          title: 'No Title',
          number: 0,
          duration: 2000
        }
      }
    }
  },
  components: {
    CountTo
  }
}
</script>

<style lang="scss" scoped>
.text-overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.number-card {
  padding: 32px;
  margin-bottom: 24px;
  cursor: pointer;
  ::v-deep .el-card__body {
    padding: 0;
  }
  .icon {
    font-size: 54px;
    float: left;
  }

  .content {
    padding-left: 78px;

    .title {
      line-height: 16px;
      font-size: 16px;
      margin-bottom: 8px;
      height: 16px;
      @extend .text-overflow;
      color: rgba($color: #000000, $alpha: 0.5);
    }

    .number {
      line-height: 32px;
      font-size: 24px;
      height: 32px;
      @extend .text-overflow;
      margin-bottom: 0;
      color: rgba($color: #000000, $alpha: 0.65);
    }
  }
}
</style>
