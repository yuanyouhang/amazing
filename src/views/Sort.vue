<template>
  <div class="h-full flex flex-col">
    <!-- 排序算法列表区域 -->
    <div class="flex gap-4">
      <div
        v-for="item in sortList"
        :key="item.name"
        class="rounded-full border-4 py-2 px-4 font-bold border-sky-400 hover:bg-sky-200 dark:hover:bg-sky-500"
        :class="{'bg-sky-400': currentSort.name === item.name, 'cursor-not-allowed': item.todo, 'cursor-pointer': !item.todo }"
        @click="changeSort(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <!-- 可视化展示区域 -->
    <div
      class="flex-1 border-4 my-4 rounded-xl border-sky-300 dark:border-white bg-white p-8 flex flex-col"
      ref="sortBoxRef"
    >
      <div
        :style="{marginBottom: padding + 'px'}"
        class="border flex-1 text-black py-2 px-4 shadow-inner"
      >
        <div v-for="item in currentSort.detail" class="mb-2">
          {{ item }}
        </div>
      </div>
      <div class="flex gap-2 items-end justify-center">
        <div
          v-for="(item, index) in computedSortData"
          :style="{ width: item.width + 'px', height: item.height + 'px' }"
          class="bg-green-400 text-center"
          :class="{'bg-red-400': currentSort.sortObj.currentElementIndex >=0 && currentSort.sortObj.currentElementIndex === index}"
        >
          {{ item.value }}
        </div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="pb-4 flex justify-end">
      <el-button type="primary" @click="rerandom" :disabled="currentSort.sortObj.sorting">重随数据</el-button>
      <el-button
        type="primary"
        @click="startSort"
        v-if="!currentSort.sortObj.sorting && !currentSort.sortObj.sorted"
      >
        开始排序
      </el-button>
      <el-button type="warning" v-if="currentSort.sortObj.sorting">排序中...</el-button>
      <el-button type="success" v-if="currentSort.sortObj.sorted">已排序</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import _ from 'lodash'
import bubbleSort from '@/utils/bubbleSort.js'
import quickSort from '@/utils/quickSort.js'
import { ElMessage } from 'element-plus'

const sortList = [
  {
    name: "冒泡排序",
    sortObj: bubbleSort,
    detail: [
      '原理：比较相邻的两个元素，如果顺序错误则交换它们的位置，重复执行这个过程直到整个数组排序完成。',
      '适用场景：冒泡排序是一种简单但效率较低的排序算法，适用于数据规模较小的情况。它的主要优点是实现简单易懂，适合用于教学和理解排序算法的基本原理。'
    ] 
  },
  {
    name: "快速排序",
    sortObj: quickSort,
    detail: [
      '原理：选择一个基准元素，将数组分为两部分，一部分小于基准元素，一部分大于基准元素，对这两部分递归地应用快速排序，直到整个数组排序完成。',
      '适用场景：快速排序是一种高效的排序算法，适用于处理大规模数据和需要快速排序的场景。它的平均时间复杂度为O(nlogn)，且具有原地排序的特点。快速排序在实际应用中被广泛使用，是许多编程语言中的默认排序算法。'
    ] 
  },
  // { name: "选择排序", todo: true },
  // { name: "插入排序", todo: true },
  // { name: "归并排序", todo: true },
  // { name: "堆排序", todo: true }
]
const currentSort = ref(sortList[0])

const dataLength = ref(0) // 数组长度
const sortData = ref([]) // 原始数据
const maxNum = 80 // 最大的数据值
const minNum = 20 // 最小的数据值
function getDataLength() {
  const newLen = 10 + Math.ceil(Math.random() * 10)
  dataLength.value = newLen
}
// 根据给定长度生成20-80的随机整数数组
function getSortData() {
  const arr = Array.from({length: dataLength.value}).map(() => {
    return minNum + Math.ceil(Math.random() * (maxNum - minNum))
  })
  sortData.value = arr
}
function rerandom() {
  currentSort.value.sortObj.setUnsorted()
  getDataLength()
  getSortData()
}
rerandom()

// 切换排序算法
function changeSort(item) {
  if(item.todo) return
  const same = currentSort.value.name === item.name
  if(same) return
  const sorting = currentSort.value.sortObj.sorting
  if(sorting) {
    ElMessage({
      message: '正在排序',
      type: 'warning',
    })
    return
  }
  currentSort.value = item
  rerandom()
}

// 实际展示的数据
// 包含待排序元素的宽、高、数值
const computedSortData = computed(() => {
  return sortData.value.map(num => {
    const width = 30
    const height = num / maxNum * computedHeight.value
    return {
      width,
      height,
      value: num
    }
  })
})

const sortBoxRef = ref(null)
const boxHeight = ref(0)
const padding = 16 // 两行，计算高度时留出上下及中间的空间
// 每一行的高度
const computedHeight = computed(() => {
  return (boxHeight.value - padding * 3) / 2
})
// 获取可视化盒子的高度
function getBoxHeight() {
  const boxRect = sortBoxRef.value.getBoundingClientRect()
  boxHeight.value = boxRect.height
}
onMounted(() => {
  getBoxHeight()
  window.addEventListener('resize', _.debounce(getBoxHeight, 300)) // 防抖，只在窗口尺寸变化停止后计算
})

function startSort() {
  currentSort.value.sortObj.sort(sortData.value)
}
</script>