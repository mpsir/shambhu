<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="q-pt-sm">
        <button class="q-pa-sm q-ma-sm" onclick="g.DeleteDb(true)">Delete Database</button>
        <select v-model="current_demo" class="q-ma-sm q-pa-sm">
          <option value="ast-editor-demo">ast-editor</option>
          <option value="monaco-editor-demo">monaco-editor</option>
          <option value="toggle-content-demo">toggle-content-demo</option>
        </select>
        <ast-editor-demo v-if="current_demo == 'ast-editor-demo'" />
        <monaco-editor-demo v-if="current_demo == 'monaco-editor-demo'" />
        <toggle-content-demo v-if="current_demo == 'toggle-content-demo'" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import ast_editor from "./ast_editor.vue"
import monaco_editor from "./monaco_editor.vue"
import toggle_content from "./toggle-content.vue"

export default {
  components:{
    'ast-editor-demo':ast_editor,
    'monaco-editor-demo':monaco_editor,
    'toggle-content-demo':toggle_content
  },
  setup: function (props, { attrs, slots, emit, expose }) {
      return {
        g: Vue.computed(() => g),
        current_demo:Vue.ref("ast-editor-demo")
      };
    }
}
</script>
