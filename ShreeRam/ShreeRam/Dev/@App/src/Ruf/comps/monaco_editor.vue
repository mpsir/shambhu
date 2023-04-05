<template>
  <div v-if="!IsReadOnly">
    <q-btn @click="update_parent()" color="white" text-color="black"
    :label="update_text" no-caps></q-btn>
  </div>
  <div style="border:1px dashed darkgrey">
    <div ref="m_editor" style="min-height:28px;"></div>
  </div>
</template>

<script>
export default {
  data() { return { Value: null, input_type: 'string' } },
  setup: function (props, { attrs, slots, emit, expose }) {
    return {
      editor: {},
      g: Vue.computed(() => g)
    };
  },
  props: {
    modelValue:{ type:String, required:true},
    update_text:{type:String, required:false, default:'Update'},
    lang:{type:String, required:false, default:'json'},
    format_on_start:{type:Boolean, required:false, default:true},
    IsReadOnly:{type:Boolean, required:false, default:true}
  },
  emits: ['update:modelValue', 'update'],
  created() { this.update_modelValue() },
  watch: {
    modelValue: {
      handler(newValue, oldValue) { this.update_modelValue() },
      deep: true
    }
  },
  mounted() {
    var this1 = this
    this.editor = g.monaco.editor.create(this.$refs.m_editor, {
      value: this1.Value,
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      language: this1.lang,
      readOnly: false,
      minimap: { enabled: false },
      showFoldingControls: 'always',
      scrollbar: {
        vertical: 'hidden',
        horizontal: "visible"
      },
      overviewRulerBorder: false,
    });

    setTimeout(() => { this.update_editor() }, 100);
    if (this1.format_on_start) {
      setTimeout(() => { this.editor.getAction('editor.action.formatDocument').run() }, 500);
      this.Value = this.editor.getValue()
    }
    this.editor.getModel().onDidChangeContent(
      event => {
        this1.update_editor();
        this1.Value = this1.editor.getValue()
        this1.$emit('update:modelValue', this1.Value)
      }
    );
    const registerOnDidChangeFolding = () => {
      const foldingContrib = this.editor.getContribution('editor.contrib.folding');
      foldingContrib.getFoldingModel().then(foldingModel => {
        foldingModel.onDidChange(() => {
          this1.Value = this1.editor.getValue()
          //console.log('editor.getValue()', this1.editor.getValue());
          //this1.editor.viewModel.lines.getViewLineCount()
        });
      });
    };
    registerOnDidChangeFolding();
    this.editor.onDidChangeModel(registerOnDidChangeFolding);
  },
  methods: {
    update_editor: function () {
      const contentHeight = this.editor.getModel().getLineCount() * 19;
      $(this.$refs.m_editor).css('height', contentHeight + 'px');
      this.editor.layout();
      this.Value = this.editor.getValue()
    },
    update_modelValue() {
      this.Value = this.modelValue
      try {
        this.editor.getModel().setValue(this.modelValue)
        if (this.format_on_start) {
          this.editor.getAction('editor.action.formatDocument').run()
        }
      } catch (error) { }
    },
    update_parent() {
      this.$emit('update', this.Value)
    },
  }
}
</script>
