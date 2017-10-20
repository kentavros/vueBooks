<template>
  <div class="authorAdd">
    <div v-if="newAuthor">
      sdfgsdgdsgdsgsdgsdgsdg
    </div>

    <div v-if="selAuthor">
      <br>
      <p class="alert alert-danger">{{selAuthor}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authorForm',
  props: ['newAuthor', 'selAuthor'],
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
