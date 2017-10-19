<template>
  <div class="authorAdd">
    
    <br>
    <p class="alert alert-danger">{{selAuthor}}</p>
  </div>
</template>

<script>
export default {
  name: 'authorForm',
  props: ['selAuthor'],
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
