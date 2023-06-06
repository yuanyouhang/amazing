<template>
  <div class="flex-1 mx-auto py-4 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 container flex flex-col justify-between">
    <div class="h-1/4 flex justify-between">
      <div
        class="w-1/4 h-full border border-black rounded-lg"
        v-for="item in 3"
      >
        {{ item }}
      </div>
    </div>
    <div class="h-1/4 flex justify-between">
      <div
        class="w-1/4 h-full border border-black rounded-lg"
        v-for="item in 3"
      >
        {{ item }}
      </div>
    </div>
    <div class="h-1/4 flex justify-between">
      <div
        class="w-1/4 h-full border border-black rounded-lg"
        v-for="item in 3"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>

</script>