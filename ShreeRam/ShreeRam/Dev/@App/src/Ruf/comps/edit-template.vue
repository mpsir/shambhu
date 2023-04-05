<template>
  <toggle-content :show_inner_p="false">
    <template #control>
      <button class="toggle-handle q-mt-sm q-pa-sm">Template</button>
    </template>

    <div class="q-my-sm">
        <button v-if="Array.isArray(Value)" class="q-pa-sm">
          + String
        </button>

        <button @click="{ Value.splice((Value.length + 1), 0, {}); update_template() }" v-if="Array.isArray(Value)"
          class="q-pa-sm">
          + Object
        </button>
      </div>

    <div v-if="typeof Value == 'string'">
      <monaco-editor :update_text="'update template'" :IsReadOnly="false" @update="{ Value = $event; update_template() }"
        :lang="'html'" :modelValue="Value" />
    </div>

    <template v-if="typeof Value == 'object'">

      <template v-if="Array.isArray(Value)">
        <div v-for="(t, t_no) in Value" class="q-my-sm">
          <monaco-editor v-if="typeof t == 'string'" :update_text="'update'" :IsReadOnly="false"
            @update="{ Value[t_no] = $event; update_template() }" :lang="'html'" :modelValue="Value[t_no]" />
          <div v-else>
            ...
          </div>
        </div>
      </template>
      <template v-else>
        edit object - template
      </template>

    </template>



  </toggle-content>
</template>

<script>
export default {
  data() {
    return {
      Value: null
    }
  },
  components: {
  },
  setup: function (props, { attrs, slots, emit, expose }) {
    return {
      g: Vue.computed(() => g)
    };
  },
  props: {
    modelValue: { type: [Object, String], required: true, default: "" }
  },
  emits: ['update:modelValue'],
  created() { this.update_modelValue() },
  watch: {
    modelValue: {
      handler(newValue, oldValue) { this.update_modelValue() },
      deep: true
    }
  },
  methods: {
    update_modelValue() { this.Value = this.modelValue },
    update_template() { this.$emit('update:modelValue', this.Value) },
  }
}
</script>
