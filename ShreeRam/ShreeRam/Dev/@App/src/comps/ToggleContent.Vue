<template>
    <span ref="controls"><slot  name="control"></slot></span>
  <slot v-if="show_inner"></slot>
  </template>
  
  <script>
  export default {
    name:"toggle-content",
    props:{
      show_inner_p:{ type:Boolean, default:true, required:false }
    },
    data(){
      return { show_inner:true }
    },
    created(){
      this.show_inner = this.show_inner_p
    },
    mounted(){
      var this1 = this
      var a = this.$refs.controls
      var b = $(a).find(".toggle-handle")
      if (!b[0]) {
        console.log('no handle found', '\nadd "toggle-handle" class to any ui element.')
      }
      else {
        var b = b[0]
        $(b).click(function(){
          this1.show_inner = !this1.show_inner
        })
      }
    }
  }
  </script>
  