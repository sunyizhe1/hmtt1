<template>
  <van-loading v-if="is_loading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      is_loading: false
    }
  },
  methods: {
    async onClick () {
      const target = this.$route.params.article_id

      this.is_loading = true
      // this.$emit('update:is_collected', !this.is_collected)
      if (this.is_collected) {
        // 取消收藏
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 添加收藏
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      this.is_loading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
