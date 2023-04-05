<template>


  <div class="parent">
      <Vue3DraggableResizable
        :initW="300"
        :initH="400"
        v-model:x="x"
        v-model:y="y"
        v-model:w="w"
        v-model:h="h"
        v-model:active="active"
        :draggable="true"
        :resizable="true"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-start="print('drag-start')"
        @resize-start="print('resize-start')"
        @dragging="print('dragging')"
        @resizing="print('resizing')"
        @drag-end="print('drag-end')"
        @resize-end="print('resize-end')"
      >

      <div>
    <q-scroll-area style="height: 400px; max-width: 100%;">
      <div>
    <q-tabs align="left" v-model="tab"
    inline-label
        mobile-arrows
        class="bg-primary text-white shadow-2"
    >
      <q-tab name="Pages" label="Pages" no-caps />

      <q-tab name="Backup-Restore" label="Backup" no-caps />
      <q-tab name="Comps"  label="Comps" no-caps />
      <q-tab name="Options"  label="Options" no-caps />
      <q-tab name="Templates"  label="Templates" no-caps />
      <q-tab name="JS"  label="JS" no-caps />
      <q-tab name="CSS"  label="CSS" no-caps />
      <q-tab name="Images"  label="Images" no-caps />
      <q-tab name="Blobs"  label="Blobs" no-caps />
    </q-tabs>
    <q-tab-panels swipeable="false"  v-model="tab">

      <q-tab-panel name="Pages">
        <div class="text-h6 q-mb-md">Pages</div>
        <db-pages />
      </q-tab-panel>

      <q-tab-panel name="Backup-Restore">
        <div class="text-h6 q-mb-md">Backup-Restore</div>
      </q-tab-panel>



      <q-tab-panel name="Comps">
        <div class="text-h6 q-mb-md">Comps</div>
        <db-comps />
      </q-tab-panel>

      <q-tab-panel name="Options">
        <div class="text-h6 q-mb-md">Options</div>
        ...
      </q-tab-panel>

      <q-tab-panel name="Templates">
        <div class="text-h6 q-mb-md">Templates</div>
        ...
      </q-tab-panel>

      <q-tab-panel name="JS">
        <div class="text-h6 q-mb-md">JS</div>
        ...
      </q-tab-panel>

      <q-tab-panel name="CSS">
        <div class="text-h6 q-mb-md">CSS</div>
        ...
      </q-tab-panel>



      <q-tab-panel name="Images">
        <div class="text-h6 q-mb-md">Images</div>
        ...
      </q-tab-panel>

      <q-tab-panel name="Blobs">
        <div class="text-h6 q-mb-md">Blobs</div>
        ...
      </q-tab-panel>

    </q-tab-panels>
  </div>
    </q-scroll-area>
  </div>


      </Vue3DraggableResizable>
    </div>

</template>

<script>
import pages from './db-pages.vue'
import comps from './db-comps.vue'
export default {
  props: {
    //show_inner_p:{ type:Boolean, default:true, required:false }
  },
  data() {
    return {
      tab:"Pages",
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false
    }
  },
  components: {
    'db-pages': pages,
    'db-comps': comps,
  },
  methods: {
    print(val) {
      console.log(val)
    }
  }
}
</script>
