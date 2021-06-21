<template lang="pug">
  .cursor-pointer
    .w-full
      picture(style="width: 200px; height: 200px;")
        source(:srcset="thumbnails.high.url" media="(min-width: 800px)")
        img(:src="thumbnails.default.url" alt="")
    .w-full
      span 231231
</template>

<script>
export default {
  props: ['thumbnails']
}
</script>