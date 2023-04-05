<template>
  <div style="border: 1px solid darkslategray; padding: 16px; margin:8px;">
    <h6>monaco_editor demo</h6>
    <div class="q-my-sm">{{ val }}</div>

    <div class="q-my-lg q-pa-sm" style="border: 1px solid grey;">
      with v-model
    <monaco-editor
        v-model="val"
        :IsReadOnly="false"
        :language="'javascript'"
        :format_on_start="true"
        />
        <pre>{{ `
<monaco-editor v-model="val" :IsReadOnly="false"
        :language="'javascript'" :format_on_start="true" />
` }}</pre>
    </div>

    <div class="q-my-lg q-pa-sm" style="border: 1px solid grey;">
        with manual update
    <monaco-editor
        :modelValue="val"
        @update="val= $event"
        :IsReadOnly="false"
        :language="'javascript'"
        :format_on_start="true"
        />
        <pre>{{ `
<monaco-editor :modelValue="val" @update="val= $event"
        :IsReadOnly="false" :language="'javascript'"
        :format_on_start="true" />
` }}</pre>
      </div>

      <div class="q-my-lg q-pa-sm" style="border: 1px solid grey;">
        hide update
    <monaco-editor
        @update="val= $event"
        :IsReadOnly="true"
        :language="'javascript'"
        :modelValue="val"
        :format_on_start="true"
        />
        <pre>{{ `
<monaco-editor @update="val= $event"
        :IsReadOnly="true"
        :language="'javascript'"
        :modelValue="val"
        :format_on_start="true" />
` }}</pre>
      </div>



    </div>
</template>

<script>
export default {
  setup: function (props, { attrs, slots, emit, expose }) {
      return {
        g: Vue.computed(() => g),
        val:Vue.ref('var a = 55')
      };
    }
}
</script>
