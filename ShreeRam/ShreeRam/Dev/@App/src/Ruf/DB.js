g.AddDB = async function () {
  var is_db_exists = await g.Dexie.exists('ShreeRam')
  g.db = await new g.Dexie("ShreeRam");
  g.db.version(1).stores({
    pages: "++id, &name",
    comps: "++id, &name",
    opts: "++id, &name",
    templates: "++id, &name",
    js: "++id, &name",
    css: "++id, &name",
    images: "++id, &name",
    blobs: "++id, &name",
  });
  if (!is_db_exists) {
    g.db.pages.bulkAdd(g.pages);
    g.db.comps.bulkAdd(g.comps);
  }
  await Dexie.liveQuery(() => db.pages.toArray()).subscribe(function (b) { g.f.update() })
  await Dexie.liveQuery(() => db.comps.toArray()).subscribe(function (b) { g.f.update() })
  await Dexie.liveQuery(() => db.opts.toArray()).subscribe(function (b) { g.f.update() })
  await Dexie.liveQuery(() => db.templates.toArray()).subscribe(function (b) { g.f.update() })
}

g.DeleteDb = async function (reload_page = false) {
  g.db.delete()
  if (reload_page) {
    location.reload()
  }
}

g.GetAppFromDB = async function (page) {
  var page_data = await g.db.pages.toArray()
  page_data = page_data.find(function (p) { return p.name == page })
  if (page_data != undefined) {
    page_data.Vue.template = g.resolve_template(page_data.Vue.template)

    for (var key in page_data.Vue) {
      if (key != "template") {
        var a = `page_data.Vue.${key} = ${page_data.Vue[key]}`
        eval(a)
      }
    }

    return page_data
  } else { return false }
}
