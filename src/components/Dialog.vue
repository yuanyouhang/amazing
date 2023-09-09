<template>
  <el-dialog :model-value="dialogVisible" width="50%" draggable :append-to-body="true" :show-close="false">
    <template #header>
      <div class="text-center font-bold text-lg">{{ conceptItem.name }}</div>
    </template>
    <div class="h-[50vh] overflow-auto -my-[30px] text-base px-3">
      <div ref="contentContainer" v-if="dialogVisible"></div>
    </div>
    <!-- <div v-html="content"></div> -->
    <template #footer>
      <div class="flex items-center justify-center">
        <el-button type="primary" @click="closeDialog">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import purify from '@/utils/dompurify.js'

const props = defineProps(['dialogVisible', 'conceptItem'])
const emits = defineEmits(['update:dialogVisible'])
function closeDialog() {
  emits('update:dialogVisible')
}

watch(() => props.dialogVisible, (newVal) => {
  if(newVal) {
    createContentShadowDOM()
  }
}, { flush: 'post' }) // 保证可以访问到更新之后的DOM
const contentContainer = ref(null)
let shadowRoot
function createContentShadowDOM() {
  const container = contentContainer.value
  shadowRoot = container.attachShadow({ mode: 'open' });
  shadowRoot.innerHTML = purify(props.conceptItem.content)
  // const style = document.createElement('style')
  // style.textContent = `
  // p {
  //   margin: 0;
  // }
  // `
  // shadowRoot.prepend(style)
}
</script>