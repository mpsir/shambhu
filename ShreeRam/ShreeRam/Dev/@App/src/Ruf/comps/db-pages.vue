<template>
  <div v-if="pages" v-for="(page, page_no) in pages" style="margin:8px">
    <edit-page :page_id="pages[page_no].id" />
  </div>
</template>

<script>
import edit_page from './db-page.vue'
export default {
  data(){
    return {
      pages : g.f.live_data(()=> db.pages.toArray() )
    }
  },
  components:{
    'edit-page':edit_page
  }
}
</script>
