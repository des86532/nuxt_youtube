<template lang="pug">
  .cursor-pointer.w-full(@click="onClick")
    .w-full
      picture
        //- source(v-if="video.snippet.thumbnails.high" :srcset="video.snippet.thumbnails.high.url" media="(min-width: 1024px)")
        //- source(v-if="video.snippet.thumbnails.standard" :srcset="video.snippet.thumbnails.standard.url" media="(min-width: 768px)")
        source(v-if="video.snippet.thumbnails.medium" :srcset="video.snippet.thumbnails.medium.url" media="(min-width: 300px)")
        img.w-full(:src="video.snippet.thumbnails.default.url" alt="")
    .max-h-12.flex.justify-between.items-start
      .line-clamp-2.overflow-ellipsis {{ video.snippet.title }}
      .w-8.h-8.inline-flex.items-center.justify-center.text-red-500(@click="addLike")
        i.fa-heart.far
</template>

<script>
export default {
  props: ['video'],
  methods: {
    onClick() {
      this.$emit('click')
    },
    addLike() {
      this.$emit('addLike')
    },
  }
}
</script>