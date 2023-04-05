<template>
  <div style="border: 1px solid darkslategray; padding: 16px; margin:8px; border-radius: 2px;">
    <h6>ast editor demo</h6>
    <div class="q-my-sm">
      {{ pages }}
    </div>
    <div class="q-my-sm">
      <toggle-content v-if="false" :show_inner_p="false">
        <template #control>
          <button class="toggle-handle q-pa-sm">Value</button>
        </template>
        <div class="q-pa-sm"> {{ Value }} </div>
      </toggle-content>
      ...
    </div>
  </div>
</template>

<script>
export default {
  setup: function (props, { attrs, slots, emit, expose }) {
    return {
      g: Vue.computed(() => g)
    };
  },
  data() {
    return {
      Value: g.r.funs,
      pages: g.f.live_data(()=> g.db.pages.toArray())
    }
  },
}
</script>
