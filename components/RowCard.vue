<template lang="pug">
  .flex.cursor-pointer.rounded.bg-gray-200.transition-transform.transform.flex-col.my-0.mx-auto.w-80(class="hover:shadow-xl hover:-translate-y-2 tablet:flex-row tablet:border-2 pad:w-full" @click="onClick")
    .w-full.flex.justify-center.items-center.flex-shrink-0.max-w-xs
      picture
        source(v-if="video.snippet.thumbnails.default" :srcset="video.snippet.thumbnails.high.url" media="(min-width: 640px)")
        img.object-fill(:src="video.snippet.thumbnails.medium.url")
    .flex-1.px-4.py-2.overflow-hidden.flex.flex-col.justify-around
       h2.text-xl.line-clamp-1.overflow-ellipsis(v-html="video.snippet.title" class="tablet:line-clamp-2")
       p {{ video.snippet.publishedAt }}
       h3 {{ video.snippet.channelTitle }}
       .line-clamp-2.overflow-ellipsis.text-gray-500 {{ video.snippet.description }}
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