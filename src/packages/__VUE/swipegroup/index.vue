<template>
  <div class="nut-swipe-group" ref="swipeGroupRef">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { provide, ref } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { create } = createComponent('swipe-group');
export default create({
  props: {
    lock: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const swipeGroupRef = ref(null);
    const name = ref('');
    const update = (n: string) => {
      name.value = n;
    };
    provide('swipeGroup', {
      update,
      lock: props.lock,
      name
    });
    return { swipeGroupRef };
  }
});
</script>
