<template>
  <div>
    <!-- <div class="g-signin2" data-width="300" data-height="200" data-onsuccess="onSignIn" data-theme="dark"></div> -->
    <button @click="test">Sign in with Google</button>
  </div>
</template>

<script>
function signInCallback(a) {
  console.log(a)
  console.log('123')
}
export default {
  methods: {
    test() {
      console.log(auth2)
      // auth2.grantOfflineAccess().then(signInCallback);
    }
  }
}
</script>