<template>
  <div class="demo" :class="{ web: env === 'WEB' }">
    <Header v-if="env === 'WEB'" />
    <h2>基础用法</h2>
    <div class="show">
      <nut-empty description="无数据"></nut-empty>
    </div>

    <h2>图片类型，内置3个</h2>
    <div class="show">
      <nut-tabs v-model="tabValue">
        <nut-tab-pane title="无内容">
          <nut-empty image="empty" description="无内容"></nut-empty>
        </nut-tab-pane>
        <nut-tab-pane title="加载失败/错误">
          <nut-empty image="error" description="加载失败/错误"></nut-empty>
        </nut-tab-pane>
        <nut-tab-pane title="无网络">
          <nut-empty image="network" description="无网络"></nut-empty>
        </nut-tab-pane>
      </nut-tabs>
    </div>

    <h2>自定义图片</h2>
    <div class="show">
      <nut-empty
        image="https://static-ftcms.jd.com/p/files/61a9e3313985005b3958672e.png"
        description="无优惠券"
      ></nut-empty>
    </div>

    <h2>底部内容</h2>
    <div class="show">
      <nut-empty image="error" description="加载失败">
        <div style="margin-top: 10px">
          <nut-button icon="refresh" type="primary">重试</nut-button>
        </div>
      </nut-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import Header from '../../../components/header.vue';
const env = Taro.getEnv();
const tabValue = ref(0);
</script>

<style lang="scss">
.demo {
  .show {
    background: #ffffff;
  }
}
</style>
