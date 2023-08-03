"use strict";

// eslint-disable-next-line no-unused-vars
var mixin = {
  data: function data() {
    return {
      openWEBGL: false
    };
  },
  methods: {
    callWEBGL: function callWEBGL() {
      this.openWEBGL = true;
    }
  }
};