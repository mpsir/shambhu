g.pages = [
  {
    name: "home",
    Vue:{
      template: `<div>home page from db</div>`,
      data: `function (){ return {} }`,
      setup: `function (props, { attrs, slots, emit, expose }) { return { } }`,
      computed: `{ g(){ return g } }`,
      components: `{}`
    },
  },
  {
    name: "editor",
    Vue:{
      template:`<div>editor page from db</div>`,
      data: `function (){ return { } }`,
      setup: `function (props, { attrs, slots, emit, expose }) { return { } }`,
      computed: `{ g(){ return g } }`,
      components: `{ }`
    }
  },
]
g.comps = [
  {
    name: "comp1",
    Vue:{
      template:`<div>comp1 from db</div>`,
      data: `data(){ return {} }`,
      setup: `setup(props, { attrs, slots, emit, expose }) { return { } }`,
      computed: `computed: { g(){ return g } }`,
      components: `{ }`
    }
  }
]
