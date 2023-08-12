import { ref } from "vue";

let animations = [] // 保存排序过程中的每个状态帧
const sorting = ref(false) // 是否正在排序
const sorted = ref(false) // 是否已排序完成
const currentElementIndex = ref(-1)

function setUnsorted() {
  sorted.value = false
}

function end() {
  sorting.value = false
  sorted.value = true
  currentElementIndex.value = -1
  animations = []
}

// 冒泡排序(从小到大)
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        animations.push([j, j + 1])
      }
    }
  }
  return arr
}

function animate(data) {
  // 根据保存的状态帧逐步更新数组的状态
  let animationIndex = 0;
  const timer = setInterval(() => {
    if (animationIndex < animations.length) {
      const [index1, index2] = animations[animationIndex];
      const temp = data[index1];
      currentElementIndex.value = index2
      data[index1] = data[index2];
      data[index2] = temp;
      animationIndex++;
    } else {
      console.log('排序完成！')
      clearInterval(timer);
      end()
    }
  }, 500); // 每隔500毫秒更新一次数组状态
}

function sort(data) {
  if(sorting.value) return
  sorting.value = true
  bubbleSort(data.slice()) // 传入源数组的复制品
  animate(data)
}

export default {
  sorting,
  sorted,
  currentElementIndex,
  setUnsorted,
  sort
}