<template>
  <view :class="classes" v-if="info && Object.keys(info)">
    <!-- 根据展示信息的多少，分为3种展示风格：simple，base，complex -->
    <comment-header :type="headerType" :info="info" :labels="labels" @handleClick="handleClick">
      <template #labels>
        <slot name="comment-labels"></slot>
      </template>
    </comment-header>

    <slot name="feature"></slot>

    <view
      class="nut-comment__main"
      :style="`-webkit-line-clamp:${conEllipsis}`"
      @click="handleClick"
      v-html="info.content"
    ></view>

    <comment-images :images="images" :videos="videos" :type="imagesRows" @clickImages="clickImages"></comment-images>

    <view class="nut-comment__follow" v-if="follow && follow.days > 0" @click="handleClick">
      <view class="nut-comment__follow-title">购买{{ follow.days }}天后追评</view>
      <view class="nut-comment__follow-com">{{ follow.content }}</view>
      <view class="nut-comment__follow-img" v-if="follow.images && follow.images.length > 0"
        >{{ follow.images.length }} 张追评图片 <Right size="12px"></Right
      ></view>
    </view>

    <comment-bottom
      :type="headerType"
      :info="info"
      :operation="operation"
      @clickOperate="clickOperate"
      @handleClick="handleClick"
    ></comment-bottom>

    <slot name="comment-shop-reply"></slot>
  </view>
</template>
<script lang="ts">
import { computed, PropType } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { componentName, create } = createComponent('comment');
import { Right } from '@nutui/icons-vue-taro';
import CommentHeader from './components/CmtHeader.taro.vue';
import CommentImages from './components/CmtImages.taro.vue';
import CommentBottom from './components/CmtBottom.taro.vue';

interface VideosType {
  id: number | string;
  mainUrl: string;
  videoUrl: string;
}
interface ImagesType {
  smallImgUrl: string;
  bigImgUrl: string;
  imgUrl: string;
}

export default create({
  props: {
    headerType: {
      type: String,
      default: 'default' //头部展示风格 default，complex
    },

    imagesRows: {
      type: String,
      default: 'one' // 'one'  'multi'
    },

    ellipsis: {
      type: [String, Number, Boolean],
      default: false
    },

    videos: {
      type: Array as PropType<VideosType[]>,
      default: () => []
    },
    images: {
      type: Array as PropType<ImagesType[]>,
      default: () => []
    },

    info: {
      type: Object,
      default: () => ({})
    },

    follow: {
      type: Object,
      default: () => ({})
    },

    labels: {
      type: Function,
      default: () => ''
    },

    operation: {
      type: Array as PropType<string[]>,
      default: ['replay', 'like', 'more']
    }
  },
  components: {
    CommentHeader,
    CommentImages,
    CommentBottom,
    Right
  },
  emits: ['click', 'clickImages', 'clickOperate'],

  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });

    const conEllipsis = computed(() => {
      if (props.ellipsis) return props.ellipsis;

      return props.headerType == 'complex' ? 6 : 2;
    });
    const clickOperate = (t: string) => {
      emit('clickOperate', t);
    };

    const handleClick = () => {
      emit('click', props.info);
    };

    const clickImages = (value: any) => {
      emit('clickImages', value);
    };

    return { classes, conEllipsis, clickOperate, handleClick, clickImages };
  }
});
</script>
