<template>
  <toggle-content :show_inner_p="false" v-if="comp">
    <template #control>
      <button class="toggle-handle q-pa-sm"> {{ comp.name }}</button>
    </template>
    <div>
        <div v-if="Array.isArray(comp.template)">
          <div>
            <button class="q-pa-sm q-my-sm" @click="update_comp">
              update {{ comp.name }}
            </button>
            <monaco-editor :update_text="'update template'" :IsReadOnly="false" @update="comp.template[0] = $event"
              :lang="'html'" :modelValue="comp.template[0]" />
          </div>
          <div v-if="true">
            <monaco-editor
              :update_text="'update comp object'" :IsReadOnly="false"
              @update="comp = g.f.parse($event)"
              :lang="'json'" :modelValue="g.f.string(comp)" />
            {{ comp }}
          </div>
        </div>
    </div>
  </toggle-content>
</template>

<script>
export default {
  props: {
    comp_id: { type: Number, required: true }
  },
  methods: {
    update_comp() {
      var a = g.f.pstring(this.comp)
      g.db.comps.put(a)
    }
  },
  data() {
    return {
      comp: g.f.live_data(() =>
        db.comps
          .filter(friend => friend.id == this.comp_id)
          //.toArray()
          .first()
      )
    }
  },
  computed: { g() { return g } },
  components: {
    //'edit-comp':edit_comp
  }
}
</script>
