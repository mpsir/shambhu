import MonacoEditor from "./comps/monaco_editor.vue"
import ToggleContent from "./comps/toggle-content.vue"
import DB_Editor from './comps/db-editor.vue'

g.resolve_template = function(template){
  if (typeof template == "string") {
    return template
  }
  return "some template"
}

g.render_template = function (template) {

  function render_temp(temp) {
    if (typeof temp == "string") { return temp }
    if (typeof temp == "object") { return render_object(temp) }
    var r = ""
    return ""
  }

  function render_object(temp) {
    return "<div> object-demo </div>"
  }

  var r = ""

  if (typeof template == "string") { return template }
  if (typeof template == "object") {
    if (Array.isArray(template)) {
      template.forEach(temp => {
        r += render_temp(temp)
      });
      return r
    }
    else { r += render_object(temp) }
  }

  return "<div>Template-Resove-Type : Unknown</div>"

}

g.add_v_plugins = function(page_object){
  var page_object_2 = {}
    if (page_object.hasOwnProperty('template')) {
      page_object_2.template = g.render_template(page_object.template)
    }

    if (page_object.hasOwnProperty('setup')) {
      var try_me = `page_object_2.setup = ${page_object.setup}`
      eval(try_me);
    }
    if (page_object.hasOwnProperty('data')) {
      var try_me = `page_object_2.data = ${page_object.data}`
      eval(try_me);
    }
    if (page_object.hasOwnProperty('computed')) {
      var try_me = `page_object_2.computed = ${page_object.computed}`
      eval(try_me);
    }
  return page_object_2
}

g.CreateApp = async function () {
  var r = g.r

  r.current_page_name = g.f.get_page_name()

  var page_object = await g.GetAppFromDB(r.current_page_name)
  var page_object_2 = g.add_v_plugins(page_object)
  g.r.current_page_object = page_object

  g.App_Wrapper = Vue.createApp(page_object_2)

  var use_draggable = page_object.use_draggable || false
  use_draggable ? g.App_Wrapper.component('draggable', vuedraggable) : null

  var use_MonacoEditor = page_object.use_MonacoEditor || false
  use_MonacoEditor ? r += g.App_Wrapper.component('monaco-editor', MonacoEditor) : null

  var use_ToggleContent = page_object.use_ToggleContent || false
  use_ToggleContent ? g.App_Wrapper.component('toggle-content', ToggleContent) : null

  g.App = g.App_Wrapper.mount("#app-div")

}

g.CreateAppEditor = async function() {
  g.AppEditor_Wrapper = Vue.createApp( g.add_v_plugins(await g.GetAppFromDB('editor')) )
  g.AppEditor_Wrapper.use(window['VueShortkey'])
  g.AppEditor_Wrapper.component('draggable', vuedraggable)
  g.AppEditor_Wrapper.component('monaco-editor', MonacoEditor)
  g.AppEditor_Wrapper.component('toggle-content', ToggleContent)
  g.AppEditor_Wrapper.component('db-editor', DB_Editor)

  g.AppEditor = g.AppEditor_Wrapper.mount("#editor-div")
}
