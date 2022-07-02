<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        if (res.data.data.results.length === 0) { // 数据加载完了需要把fininsh变成true 新旧数据要合并在一起而不是把新数据去覆盖旧的数据
          this.finished = true
          return
        }
        this.list.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++ // 每次到底部页码值加一，请求下一页数据
      this.getSearchResult()
    },
    // 下拉刷新
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
