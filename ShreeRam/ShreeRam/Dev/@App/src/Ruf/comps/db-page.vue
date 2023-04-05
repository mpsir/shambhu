<template>
  <toggle-content :show_inner_p="true" v-if="page">
    <template #control>
      <button class="toggle-handle q-pa-sm"> {{ page.name }}</button>
    </template>
    <div>
      <toggle-content :show_inner_p="false">
        <template #control>
          <button class="toggle-handle q-pa-sm"> Page-Object</button>
        </template>
        <div>
        <monaco-editor :update_text="'update page object'" :IsReadOnly="false"
          @update="{page = g.f.parse($event); update_page()}"
          :lang="'json'" :modelValue="g.f.string(page)" />
      </div>
      </toggle-content>
      <edit-template
        :modelValue="page.template"
        @update:modelValue="{page.template = $event; update_page()}"
        />
    </div>
  </toggle-content>
</template>

<script>
import edit_template from './edit-template.vue'
export default {
  props: {
    page_id: { type: Number, required: true }
  },
  methods: {
    update_page() {
      var a = g.f.pstring(this.page)
      g.db.pages.put(a)
    }
  },
  data() {
    return {
      page: g.f.live_data(() =>
        db.pages
          .filter(friend => friend.id == this.page_id)
          //.toArray()
          .first()
      )
    }
  },
  computed: { g() { return g } },
  components: {
    'edit-template': edit_template
  }
}
</script>
