<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateformat
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    type: {
      type: String,
      required: true,
      Validator (value) {
        // 数据只有在a或才会通过      }
        return ['a', 'c'].includes(value)
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 5
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res)
        // 数据已全部加载完毕，则直接将finished设置成true即可
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results) // 保留每一页的数据
        // 本次返回结果的最后一个评论id，作为请求下一页的数据的offset参数，若本次无具体数据，则值为NULL
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每次当前页面数据拿回来了就把Loading转圈效果关闭掉
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
