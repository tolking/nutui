<template>
  <view class="nut-short-password">
    <nut-popup
      :style="{
        padding: '30px 24px 20px 24px',
        borderRadius: '12px',
        textAlign: 'center',
        top: '45%'
      }"
      v-model:visible="show"
      :closeable="true"
      @click-close-icon="close"
      :close-on-click-overlay="closeOnClickOverlay"
      @click-overlay="close"
    >
      <view class="nut-short-password-title">{{ title || translate('title') }}</view>
      <view class="nut-short-password-subtitle">{{ desc || translate('desc') }}</view>
      <view class="nut-short-password-wrapper">
        <view class="nut-short-password__list" @touchstart="focus">
          <view class="nut-short-password__item" v-for="(sublen, index) in new Array(comLen)" :key="index">
            <view class="nut-short-password__item-icon" v-if="String(realInput).length > index"></view>
          </view>
        </view>
      </view>
      <view class="nut-short-password__message">
        <view class="nut-short-password--error">{{ errorMsg }}</view>
        <view class="nut-short-password--forget" @click="onTips" v-if="tips || translate('tips')">
          <tips class="icon" size="11px"></tips>
          <view>{{ tips || translate('tips') }}</view>
        </view>
      </view>
    </nut-popup>
  </view>
</template>
<script lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { createComponent } from '@/packages/utils/create';
import Popup from '../popup/index.taro.vue';
import { Tips } from '@nutui/icons-vue-taro';
const { create, translate } = createComponent('short-password');
import { eventCenter, getCurrentInstance } from '@tarojs/taro';
export default create({
  components: {
    [Popup.name]: Popup,
    Tips
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    errorMsg: {
      type: String,
      default: ''
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    length: {
      type: [String, Number], //4～6
      default: 6
    }
  },
  emits: ['update:modelValue', 'update:visible', 'complete', 'tips', 'close', 'focus'],
  setup(props, { emit }) {
    const realInput = ref(props.modelValue);
    const comLen = computed(() => range(Number(props.length)));
    const show = ref(props.visible);
    function focus(event: any) {
      event.stopPropagation();
      emit('focus');
    }
    watch(
      () => props.visible,
      (value) => {
        show.value = value;
      }
    );
    watch(
      () => props.modelValue,
      (value) => {
        realInput.value = value;
        if (String(value).length === comLen.value) {
          emit('complete', value);
        }
      }
    );
    function close() {
      emit('update:visible', false);
      emit('close');
    }
    function range(val: number) {
      return Math.min(Math.max(4, val), 6);
    }
    function onTips() {
      emit('tips');
    }
    onMounted(() => {
      eventCenter.once((getCurrentInstance() as any).router.onReady, () => {});
    });
    return {
      comLen,
      realInput,
      range,
      close,
      onTips,
      focus,
      show,
      translate
    };
  }
});
</script>
