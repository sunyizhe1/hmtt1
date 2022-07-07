<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem class="comment" :item="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <!-- 新添加评论 -->
    <van-popup v-model="isAddCommentShow" position="bottom">
      <addComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></addComment>
    </van-popup>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
import addComment from './addComment.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      limit: 10,
      offset: null,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, addComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.bottom {
  width: 750px;
  height: 110px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
.comment1 {
  margin-bottom: 110px;
}
</style>
