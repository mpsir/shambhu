<template>

<div>db</div>


</template>

<script>
import pages from './db-pages.vue'
import comps from './db-comps.vue'
export default {
  props: {
    //show_inner_p:{ type:Boolean, default:true, required:false }
  },
  data() {
    return {
      tab:"Pages",
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false
    }
  },
  components: {
    'db-pages': pages,
    'db-comps': comps,
  },
  methods: {
    print(val) {
      console.log(val)
    }
  }
}
</script>
