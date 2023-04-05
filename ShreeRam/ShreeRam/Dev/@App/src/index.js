import "./data.js"

g.r = Vue.reactive({ IsLive: true, BlockEditor:true, Editor:true })
g.f = {
  pstring(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  string(obj) {
    return JSON.stringify(obj)
  },
  parse(obj) {
    return JSON.parse(obj)
  },
  Socket: {
    add_socket() {
      var socket = {}
      var isSocket = false
      if (g.f.is_local_host()) {
        socket = io('http://localhost:8080/')
        isSocket = true
      } else {
        if (location.host != 'mpsir.github.io') {
          socket = g.io('http://super1mpsir-57484.portmap.host:57484/')
          isSocket = true
        }
      }
    },
  },
  Data: {
    get_live_data(my_fun) {
      return VueUse.useObservable(Dexie.liveQuery(my_fun))
    },
    is_local_host: function () {
      if (location.port == '8080' || location.port == '3000') {
        return true
      } else {
        return false
      }
    },
    get_page_name() {
      var a = location.search
      if (a == '') {
        return 'home'
      }
      const params = new URLSearchParams(a).get('page')
      if (params) {
        return params
      } else {
        return 'home'
      }
    },
  },
  get_page_array_no: function (page_name) {
    var r = 0
    g.h.pages.forEach(function (page, page_no) {
      if (page_name == page.name) {
        r = page_no
      }
    });
    return r
  },
  Resolve: {
    App(page_object, page_name) {
      var page_address = `g.h.pages[${g.f.get_page_array_no(page_name)}]`
      var page_object = g.f.pstring(page_object)
      var r = {}
      for (var key in page_object.VApp) {
        var k = page_object.VApp[key]
        var n = `r.${key}`
        var c = `${n} = ${k}`
        eval(c);
      }
      r.template = g.f.Resolve.Template(page_object.template, page_address, (page_address + '.template') )
      console.log('r.template\n', r.template);
      console.log('page_object:in', page_object);
      console.log('app_object:out', r, "\n\n");
      return r
    },
    Template(Template, p_address, t_address) {

      var r = ""
      r += "<App>"

      if (typeof Template == "string") {
        r += Template
      } else {
        r += "<block-element"
        r += ` :p_address="'p_address'"`
        r += ` :t_address="'t_address'"`
        r += `>`
        r += `</block-element>`
      }

      r += "</App>"
      return r

    },
    GetPageFromDB(current_page_name) {
      var a = g.h.pages.find(function (p) { return current_page_name == p.name })
      if (a) { return a }

      return {
        template: "page not found"
      }

    },
    GetCompFromDB(current_page_name) {
      var a = g.h.comps.find(function (p) { return current_page_name == p.name })
      if (a) { return a }
      return {
        template: `comp not found : ${current_page_name}`
      }

    }
  },
  App: {
    async Start() {
      console.log("\nApp is Starting ...\n\n");
      g.App_Wrapper = Vue.createApp(g.h.pages.ElectronHome)
      g.App_Wrapper.use(Quasar)
      g.App_Wrapper.component('draggable', vuedraggable)
      g.App_Wrapper.component('monaco-editor', g.h.comps.MonacoEditor)
      g.App_Wrapper.component('toggle-content', g.h.comps.ToggleContent)
      g.App = g.App_Wrapper.mount('#app-div')
    },
    async Create_Default_App() {
      globalThis.hasOwnProperty('process') ? g.d.IsElectronApp = true : g.d.IsElectronApp = false
      g.r.current_page_name = g.f.Data.get_page_name()
      g.d.current_page_object = g.f.Resolve.GetPageFromDB(g.r.current_page_name)
      var AppData = g.f.Resolve.App(g.d.current_page_object, g.r.current_page_name)
      g.App_Wrapper = Vue.createApp(AppData)
      g.App_Wrapper.component('draggable', vuedraggable)
      g.App_Wrapper.component('monaco-editor', g.f.Resolve.GetCompFromDB("monaco-editor"))
      g.App_Wrapper.component('toggle-content', g.f.Resolve.GetCompFromDB("toggle-content"))
      g.App = g.App_Wrapper.mount('#app-div')
    },
    async Create_Editor_App() {
      // console.log(`creating editor`);
      // var editor_obj = g.f.Resolve.GetPageFromDB("editor")
      // var AppData = g.f.Resolve.App(editor_obj, 'editor')
      g.Editor_Wrapper = Vue.createApp(g.Editor)
      g.Editor_Wrapper.component('draggable', vuedraggable)
      g.Editor_Wrapper.component('monaco-editor', g.f.Resolve.GetCompFromDB("monaco-editor"))
      g.Editor_Wrapper.component('toggle-content', g.f.Resolve.GetCompFromDB("toggle-content"))
      g.Editor = g.Editor_Wrapper.mount('#editor-div')
    },
    update() {
      if (g.App) {
        g.App_Wrapper.unmount()
        $('#app-div').removeAttr('data-v-app')
        // g.CreateApp()
        g.f.App.Create_Default_App()
      }
    }
  },
  Open_Editor(p_address, t_address){

  }
}
