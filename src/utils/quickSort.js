import { ref } from "vue";

let animations = [] // 保存排序过程中的动画
const sorting = ref(false) // 是否正在排序
const sorted = ref(false) // 是否已排序完成
const currentElementIndex = ref(-1)

function setUnsorted() {
  sorted.value = false
}

function setSorted() {
  sorted.value = true
}

function end() {
  sorting.value = false
  sorted.value = true
  currentElementIndex.value = -1
  animations = []
}

// 修改复制数组，并将涉及的下标保存起来
function swap(dataCopy, index1, index2, animations) {
  const temp = dataCopy[index1]
  dataCopy[index1] = dataCopy[index2]
  dataCopy[index2] = temp
  animations.push([index1, index2])
}

// 选择基准元素，并根据该元素将数组分为两部分
function partition(dataCopy, low, high, animations) {
  const pivot = dataCopy[high] // 基准元素
  let i = low - 1
  for (let j = low; j < high; j++) {
    if (dataCopy[j] < pivot) {
      i++
      swap(dataCopy, i, j, animations)
    }
  }
  swap(dataCopy, i + 1, high, animations)
  return i + 1
}

// 快速排序：选择一个基准元素，将数组分为两部分，一部分小于基准元素，一部分大于基准元素，对这两部分递归地应用快速排序，直到整个数组排序完成。
function quickSort(dataCopy, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(dataCopy, low, high, animations)
    quickSort(dataCopy, low, pivotIndex - 1, animations)
    quickSort(dataCopy, pivotIndex + 1, high, animations)
  }
}

function sort(data) {
  if(sorting.value) return
  sorting.value = true
  const dataCopy = data.slice() // 复制数组，避免修改原始数据
  // 进行快速排序，并保存状态帧
  quickSort(dataCopy, 0, dataCopy.length - 1, animations)
  // 根据保存的状态帧逐步更新源数组的状态
  let animationIndex = 0
  const timer = setInterval(() => {
    if (animationIndex < animations.length) {
      const [index1, index2] = animations[animationIndex]
      const temp = data[index1]
      currentElementIndex.value = index2
      data[index1] = data[index2]
      data[index2] = temp
      animationIndex++
    } else {
      clearInterval(timer)
      console.log('排序完成！')
      end()
    }
  }, 500); // 每隔500毫秒更新一次数组状态
}

export default {
  sorting,
  sorted,
  currentElementIndex,
  setUnsorted,
  setSorted,
  sort
}