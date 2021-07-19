<template lang="pug">
  .card.cursor-pointer.w-full.relative
    .w-full(@click="onClick")
      picture
        //- source(v-if="video.snippet.thumbnails.high" :srcset="video.snippet.thumbnails.high.url" media="(min-width: 1024px)")
        //- source(v-if="video.snippet.thumbnails.standard" :srcset="video.snippet.thumbnails.standard.url" media="(min-width: 768px)")
        source(v-if="video.snippet.thumbnails.medium" :srcset="video.snippet.thumbnails.medium.url" media="(min-width: 300px)")
        img.w-full(:src="video.snippet.thumbnails.default.url" :alt="video.snippet.title")
    .max-h-15.flex.justify-between.items-start
      .line-clamp-2.overflow-ellipsis.leading-8.flex-grow.pl-1(class="w-11/12" @click="onClick") {{ video.snippet.title }}
      .w-8.h-8.inline-flex.items-center.justify-center.text-red-500.transition-transform.transform(@click="addLike" class="hover:scale-125")
        i.fa-heart.far(:class="{ 'fas' : liked }")
    .absolute.w-8.h-8.top-0.right-0.text-white.inline-flex.items-center.justify-center(v-if="!isMobile" class="hover:scale-125 hover:text-red-500" @click="external")
      i.fas.fa-external-link-alt
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: {},
    },
    liked: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    addLike() {
      this.$emit('addLike')
    },
    external() {
      this.$emit('external')
    }
  }
}
</script>