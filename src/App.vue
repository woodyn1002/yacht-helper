<template>
  <b-container>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="#">YachtHelper</b-navbar-brand>
    </b-navbar>
    <YachtHelper/>
  </b-container>
</template>

<script>
import YachtHelper from './components/YachtHelper.vue'

export default {
  name: 'App',
  components: {
    YachtHelper
  }
}
</script>
