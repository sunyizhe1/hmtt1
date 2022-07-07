<template>
  <van-field
    v-model="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="field"
  >
    <template #extra>
      <van-button
        type="default"
        :disabled="message.length === 0"
        @click="onClick"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      type: [Number, String]
    }
  },
  created () {

  },
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({ target: this.target, content: this.message, art_id: this.art_id })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
button {
  border: none;
}
</style>
