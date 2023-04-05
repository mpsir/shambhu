<template>
  <div v-if="comps"
  style="margin:8px"
  >
    <div v-if="comps.length" v-for="(comp, comp_no) in comps">
      <edit-comp :comp_id="comps[comp_no].id" />
    </div>
    <div v-else>
      We have 0 components this time.
    </div>
  </div>
</template>

<script>
import edit_comp from './db-comp.vue'
export default {
  data(){
    return {
      comps : g.f.live_data(()=> db.comps.toArray() )
    }
  },
  components:{
    'edit-comp':edit_comp
  }
}
</script>
