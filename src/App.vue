<template>
<div>
 <div id = 'app'>
  <v-app>
  <div>
    <canvas ref="bjsCanvas" :width="mainWidth" :height="mainHeight"/>
  </div>
  <div>
        <v-btn @click="freeze0">{{freezeText}}</v-btn>

        <v-btn @click="toggleGitter0">Gitter</v-btn>
        <v-btn @click="toggleCoords0">Coords</v-btn>
        <v-btn @click="toggleAxes0">Axes</v-btn>
        <v-btn @click="toggleArms0">Arms</v-btn>

        <v-btn @click="showAngles = !showAngles">Angles</v-btn>
        <v-btn @click="showDH = !showDH">DH</v-btn>
        <v-btn @click="showSizes = !showSizes">Gui</v-btn>

	<br>
	<br>

        <v-form v-show="showAngles">
          <v-container>
            <v-row>
                <v-text-field v-model="anglesOneLiner" label="Angles" class="shrink"/>
                <v-btn @click="reset0('0,0,0,0,0,0')">reset Angles</v-btn>
            </v-row>
          </v-container>
        </v-form>
        <v-form v-show="showSizes">
          <v-container>
            <v-row>
                <v-text-field v-model="mainWidth" label="Width" class="shrink"/>
                <v-text-field v-model="mainHeight" label="Height" class="shrink"/>
            </v-row>
          </v-container>
        </v-form>
        <v-form v-show="showDH">
          <v-container>
            <v-row>
              <v-btn @click="recalc">redraw after DH change</v-btn><br>
            </v-row>
            <v-row>
                <v-text-field v-model="ARP" label="A[R|P*]" class="shrink"/>
                <v-text-field v-model="A0" label="A0" class="shrink"/>
            </v-row>
            <v-row>
                <v-text-field v-model="A1" label="A1"/>
            </v-row>
            <v-row>
                <v-text-field v-model="A2" label="A2"/>
            </v-row>
            <v-row>
                <v-text-field v-model="A3" label="A3"/>
            </v-row>
            <v-row>
                <v-text-field v-model="A4" label="A4"/>
            </v-row>
            <v-row>
                <v-text-field v-model="A5" label="A5"/>
            </v-row>
            <v-row>
                <v-text-field v-model="A6" label="A6"/>
            </v-row>
            <v-row>
                <v-text-field v-model="Tool" label="Tool" class="shrink"/>
            </v-row>
          </v-container>
        </v-form>
  </div>
  </v-app>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify)

import { dhType, dh, dhString, toolString, angle, coord, store, setAngles,
		set_A_Value } from './Store.js';
import { getForward } from './ForwardCalculate.js';
import { createScene, freeze } from "./RobotScene";
import { toggleGitter, toggleCoords, refreshGitter, refreshCoords } from "./RobotCoords";
import { toggleAxes, refreshAxes } from "./RobotAxes";
import { toggleArms, refreshArms } from "./RobotArms";

export default {
  name: "app",

  mounted() {
//    vuetify: new Vuetify();
//    Vue.use(Vuetify);
    const bjsCanvas = this.$refs.bjsCanvas;
    if (bjsCanvas) {
      createScene(bjsCanvas);
    }
  },
  data() {
    return{
      store,
      angle,
      dh,
      coord,
      showAngles: true,
      showDH: true,
      showSizes: false,
      mainWidth: 800,
      mainHeight: 400,
      anglesOneLiner: angle,
      freezeText: "freeze",
      ARP: dhType,
      A0: dhString(0, true),
      A1: dhString(1, true),
      A2: dhString(2, true),
      A3: dhString(3, true),
      A4: dhString(1, true),
      A5: dhString(1, true),
      A6: dhString(1, true),
      Tool: toolString(true)
    }
  },
  methods: {
    toggleGitter0 : function() {
      toggleGitter();
    },
    toggleCoords0 : function() {
      toggleCoords();
    },
    toggleArms0 : function() {
      toggleArms();
    },
    toggleAxes0 : function() {
      toggleAxes();
    },
    reset0 : function(newValue) {
      this.anglesOneLiner = newValue;
      setAngles(this.anglesOneLiner);
      getForward();
      refreshGitter();
      refreshCoords();
      refreshArms();
      refreshAxes();
    },
    recalc : function() {
      this.reset0(this.anglesOneLiner);
    },
    freeze0 : function() {
      freeze();
      if(store.updateFast) {
        this.freezeText = "freeze";
      }
      else {
        this.freezeText = "unfreeze";
      }
    }
  },
  watch: {
      anglesOneLiner(newValue) {
        this.reset0(newValue);
      },
      ARP(newValue) {
        set_A_Value(-2, newValue);
      },
      A0(newValue) {
        set_A_Value(0, newValue);
      },
      A1(newValue) {
        set_A_Value(1, newValue);
      },
      A2(newValue) {
        set_A_Value(2, newValue);
      },
      A3(newValue) {
        set_A_Value(3, newValue);
      },
      A4(newValue) {
        set_A_Value(4, newValue);
      },
      A5(newValue) {
        set_A_Value(5, newValue);
      },
      A6(newValue) {
        set_A_Value(6, newValue);
      },
      Tool(newValue) {
        set_A_Value(-1, newValue);
      }
  },
  vuetify: new Vuetify({
  })
};
</script>
