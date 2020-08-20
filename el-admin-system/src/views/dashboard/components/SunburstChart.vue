<template>
  <div class="chart" :style="{ width, height }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    console.log(this.$el)
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      const item1 = {
        color: '#F54F4A'
      }
      const item2 = {
        color: '#FF8C75'
      }
      const item3 = {
        color: '#FFB499'
      }

      const data = [
        {
          children: [
            {
              value: 5,
              children: [
                {
                  value: 1,
                  itemStyle: item1
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 1,
                      itemStyle: item2
                    }
                  ]
                },
                {
                  children: [
                    {
                      value: 1
                    }
                  ]
                }
              ],
              itemStyle: item1
            },
            {
              value: 10,
              children: [
                {
                  value: 6,
                  children: [
                    {
                      value: 1,
                      itemStyle: item1
                    },
                    {
                      value: 1
                    },
                    {
                      value: 1,
                      itemStyle: item2
                    },
                    {
                      value: 1
                    }
                  ],
                  itemStyle: item3
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 1
                    }
                  ],
                  itemStyle: item3
                },
                {
                  children: [
                    {
                      value: 1,
                      itemStyle: item2
                    }
                  ]
                }
              ],
              itemStyle: item1
            }
          ],
          itemStyle: item1
        },
        {
          value: 9,
          children: [
            {
              value: 4,
              children: [
                {
                  value: 2,
                  itemStyle: item2
                },
                {
                  children: [
                    {
                      value: 1,
                      itemStyle: item1
                    }
                  ]
                }
              ],
              itemStyle: item1
            },
            {
              children: [
                {
                  value: 3,
                  children: [
                    {
                      value: 1
                    },
                    {
                      value: 1,
                      itemStyle: item2
                    }
                  ]
                }
              ],
              itemStyle: item3
            }
          ],
          itemStyle: item2
        },
        {
          value: 7,
          children: [
            {
              children: [
                {
                  value: 1,
                  itemStyle: item3
                },
                {
                  value: 3,
                  children: [
                    {
                      value: 1,
                      itemStyle: item2
                    },
                    {
                      value: 1
                    }
                  ],
                  itemStyle: item2
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 1
                    },
                    {
                      value: 1,
                      itemStyle: item1
                    }
                  ],
                  itemStyle: item1
                }
              ],
              itemStyle: item3
            }
          ],
          itemStyle: item1
        },
        {
          children: [
            {
              value: 6,
              children: [
                {
                  value: 1,
                  itemStyle: item2
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 2,
                      itemStyle: item2
                    }
                  ],
                  itemStyle: item1
                },
                {
                  value: 1,
                  itemStyle: item3
                }
              ],
              itemStyle: item3
            },
            {
              value: 3,
              children: [
                {
                  value: 1
                },
                {
                  children: [
                    {
                      value: 1,
                      itemStyle: item2
                    }
                  ]
                },
                {
                  value: 1
                }
              ],
              itemStyle: item3
            }
          ],
          itemStyle: item1
        }
      ]
      const option = {
        title: {
          text: 'Sunburst'
        },
        series: {
          radius: ['15%', '80%'],

          type: 'sunburst',
          sort: null,
          highlightPolicy: 'ancestor',
          data: data,
          label: {
            rotate: 'radial'
          },
          levels: [],
          itemStyle: {
            color: '#ddd',
            borderWidth: 2
          }
        }
      }

      this.chart.setOption(option)
    }
  }
}
</script>

<style></style>
