<template lang="pug">
  .w-full.flex.border.rounded.border-2.cursor-pointer(class="hover:shadow-xl" @click="onClick")
    .block
      picture
        source(v-if="video.snippet.thumbnails.default" :srcset="video.snippet.thumbnails.medium.url" media="(min-width: 300px)")
        img(:src="video.snippet.thumbnails.high.url")
    .flex-1.px-4.py-2
       h2.text-xl.mb-1 {{ video.snippet.title }}
       p.mb-3 {{ video.snippet.publishedAt }}
       h3.mb-3 {{ video.snippet.channelTitle }}
       .line-clamp-2.overflow-ellipsis {{ video.snippet.description }}
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>