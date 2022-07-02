<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in getChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelsShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelsShow"
      position="bottom"
      :style="{ height: '98%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="getChannels"
        :active="active"
        @change-article="
          active = $event;
          isChannelsShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNEL = 'channel'

export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      getChannels: [],
      isChannelsShow: false
    }
  },
  methods: {
    // 持久化
    // 页面打开拿频道数据 1.没有登录，第一次安装好app，第一次打开的时候，只能去ajax去拿  2.没有登录，但是第二次打开，有可能频道被用户编辑或删除过，这样的话从本地拿。3.登录过，直接从ajax拿
    async getMyChannels () {
      const channels = getItem(CHANNEL)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.getChannels = channels
      } else {
        try {
          const res = await getMyChannels()
          // console.log(res)
          this.getChannels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  position: fixed;
  right: 0;
  min-width: 100px;
  height: 82px;
  line-height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  // opacity: 0.9;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  // opacity: 0.9;
}
/deep/ .van-tabs__wrap {
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
