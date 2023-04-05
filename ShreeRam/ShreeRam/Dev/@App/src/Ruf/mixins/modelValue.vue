<template>
  <div>
    <div>This is a comp</div>
  </div>
</template>

<script>
export default {
  setup: function (props, { attrs, slots, emit, expose }) {
    return {
      g: Vue.computed(() => g)
    };
  },
  data() { return { Value: null } },
  props: {
    modelValue:{ type:Object, required:true, default:""}
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
    update_parent() { this.$emit('update:modelValue', this.Value) },
  }
}
</script>
