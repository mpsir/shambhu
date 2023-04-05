<template>
  <div style="border: 1px solid darkslategray; padding: 16px; margin:8px; border-radius: 2px;">
    <h6>toggle-content demo</h6>
    <div class="q-my-sm q-pa-sm" style="border: 1px solid grey;">
      <p>inner data is opened by default.</p>
      <toggle-content>
        <template #control>
          <button class="toggle-handle q-pa-sm">click</button>
        </template>
        <div> Inner data </div>
      </toggle-content>
        <pre>{{ `
<toggle-content>
    <template #control>
      <button class="toggle-handle">click</button>
    </template>
    <div> Inner data </div>
</toggle-content>
` }}</pre>
    </div>
    <div class="q-my-sm q-pa-sm" style="border: 1px solid grey;">
      <toggle-content :show_inner_p="false">
        <template #control>
          <button class="toggle-handle q-pa-sm">click</button>
        </template>
        <div> Inner data </div>
      </toggle-content>
        <pre>{{ `
<toggle-content :show_inner_p="false">
    <template #control>
      <button class="toggle-handle">click</button>
    </template>
    <div> Inner data </div>
</toggle-content>
` }}</pre>
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
    return { }
  },
}
</script>
