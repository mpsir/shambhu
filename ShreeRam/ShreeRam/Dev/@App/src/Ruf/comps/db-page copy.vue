<template>
  <toggle-content :show_inner_p="false" v-if="Array.isArray(page) && page.length">
    <template #control>
      <button class="toggle-handle q-pa-sm"> {{ page[0].name }}</button>
    </template>
    <div>
      <div>
        <div v-if="false">{{ page }}</div>
        <div v-if="Array.isArray(page[0].template)">
          <div>
            <button class="q-pa-sm q-my-sm" @click="update_page">
              update {{ page[0].name }}
            </button>
            <monaco-editor :update_text="'update template'" :IsReadOnly="false" @update="page[0].template[0] = $event" :lang="'html'"
              :modelValue="page[0].template[0]" />
          </div>
        </div>
      </div>
    </div>
  </toggle-content>
</template>

<script>
export default {
  props: {
    page_id: { type: Number, required: true }
  },
  methods: {
    update_page() {
      //console.log('ok');
      var a = g.f.pstring(this.page[0])
      g.db.pages.put(a)
    }
  },
  data() {
    return {
      page: g.f.live_data(() =>
        db.pages
          .filter(friend => friend.id == this.page_id)
          .toArray().first()
      )
    }
  },
  computed: { g() { return g } },
  components: {
    //'edit-page':edit_page
  }
}
</script>
