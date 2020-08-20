<template>
  <div class="dashboard-container">
    <el-row :gutter="24">
      <el-col v-for="card in numberCardList" :key="card.id" :lg="6" :md="12">
        <number-card :card="card" />
      </el-col>
      <el-col :lg="18" :md="24">
        <el-card shadow="hover">
          <line-chart />
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-card shadow="hover">
          <sunburst-chart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NumberCard from './components/NumberCard'
import LineChart from './components/LineChart'
import SunburstChart from './components/SunburstChart'
export default {
  components: {
    NumberCard,
    LineChart,
    SunburstChart
  },
  data() {
    return {
      numberCardList: [
        {
          id: 0,
          icon: 'el-icon-coffee',
          title: 'Online Review',
          number: 1520,
          color: '#64ea91',
          duration: 2600
        },
        {
          id: 1,
          icon: 'el-icon-ice-tea',
          title: 'New Customers',
          number: 3011,
          color: '#8fc9fb',
          duration: 3000
        },
        {
          id: 2,
          icon: 'el-icon-ice-drink',
          title: 'Active Projects',
          number: 105,
          color: '#d897eb',
          duration: 3200
        },
        {
          id: 3,
          icon: 'el-icon-milk-tea',
          title: 'Referrals',
          number: 2020,
          color: '#f69899',
          duration: 3600
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  top: 52px;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  margin: auto;
  padding: 32px;
  background-color: #f0f2f5;
}
</style>
